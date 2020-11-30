import logging
import os
import re
import boto3
import shutil
import zipfile

from pathlib import Path
from inflection import camelize, pluralize, singularize, underscore

# Variables
bucket = "rehearsal-log"
lambda_dir = "C:\\Users\\david\\Documents\\Programming\\rehearsal-log\\lambda_functions"

# Layers and functions
lambda_layers = ["DBAccessData", "inflection", "pymysql", "RDSCert"]
lambda_functions = [{"resource": "practices", "verbs": ["get", "post"]},
                    {"resource": "exercises", "verbs": ["get", "post"]}]

# Logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Clients
lambda_client = boto3.client("lambda")
s3_client = boto3.client("s3")


def zip_em_all():
    zip_locs = []
    for item in lambda_functions:
        for verb in item["verbs"]:
            fn_name = function_name_format(item["resource"], verb)
            zip_locs.append({"zip_from": f'{lambda_dir}\\{item["resource"]}\\{verb.upper()}',
                       "zip_to": f'{lambda_dir}\\zips\\functions\\{item["resource"]}\\{fn_name}.zip'})

    for fn in zip_locs:
        fn_dir = re.match(r'.*rehearsal-log\\(.*)', fn["zip_from"]).group(1)
        print(f"zipped function {fn_dir}\\lambda_function.py")
        zf = zipfile.ZipFile(fn['zip_to'], "w")
        os.chdir(fn["zip_from"])
        zf.write("lambda_function.py")
        zf.close()

    os.chdir(f"{lambda_dir}\\zips")
    for layer in lambda_layers:
        print(f"zipped layer {layer}")
        shutil.make_archive("layers/"+layer, 'zip', "../layers/"+layer)


def print_services():
    session = boto3.session.Session()
    for service in session.get_available_services():
        print(service)


def get_s3_objects():
    return s3_client.list_objects(Bucket=bucket)["Contents"]


def upload_file(s3_key):
    try:
        s3_client.upload_file(s3_key, bucket, "zips/" + s3_key)
        print(f"Uploaded {s3_key}")
    except Exception as e:
        raise e


def publish_layer(layer_name):
    s3_key = f'zips/layers/{layer_name}.zip'
    response = lambda_client.publish_layer_version(
        LayerName=layer_name,
        Content={
            'S3Bucket': bucket,
            'S3Key': s3_key,
        },
        CompatibleRuntimes=["python3.8"]
    )
    return response


def publish_layers():
    for layer in lambda_layers:
        publish_layer(layer)
        print(f"Published layer {layer}")


def print_methods(obj, grep=None, show_underscores=False):
    methods = dir(obj)
    if not show_underscores:
        methods = list(filter(lambda meth: "__" not in meth and meth[0] != "_", methods))
    if grep:
        methods = list(filter(lambda meth: grep in meth, methods))
    for method in methods:
        print(method)


def get_latest_layers():
    layers = dict()
    for l in lambda_client.list_layers()["Layers"]:
        layer_name = l["LayerName"]
        version = l["LatestMatchingVersion"]["Version"]
        layers[layer_name] = {"LatestMatchingVersion": int(version)}
    return layers


def update_function_layers(fn_name, layers):
    resp = lambda_client.update_function_configuration(
        FunctionName=fn_name,
        Layers=layers
    )
    print(f"Updated {fn_name} with layers: {layers}")
    return resp


def update_functions_to_latest_layers():
    latest_layers = get_latest_layers()

    functions = lambda_client.list_functions()["Functions"]
    for fn in functions:
        layers_to_update = []
        fn_name = fn["FunctionName"]
        for layer in fn["Layers"]:
            arn = layer["Arn"].split(":")
            layer_name = arn[-2]
            latest_version = latest_layers[layer_name]["LatestMatchingVersion"]
            new_arn = layer["Arn"].rsplit(":", 1)[0] + ":" + str(latest_version)
            layers_to_update.append(new_arn)
        try:
            update_function_layers(fn_name, layers_to_update)
        except Exception as e:
            raise e


def s3_sync():
    for path in Path("").rglob("*.*"):
        posix_path = path.as_posix()
        # print(posix_path)
        upload_file(posix_path)


def update_function_code(fn_name):
    resource = underscore(fn_name).rsplit("_")[-1]
    s3_key = f"zips/functions/{pluralize(resource)}/{fn_name}.zip"
    print(f"Updating {fn_name} code with s3_key: {s3_key}")
    resp = lambda_client.update_function_code(
        FunctionName=fn_name,
        S3Bucket=bucket,
        S3Key=s3_key,
        # DryRun=True
    )
    print(f"Updated {fn_name} function code")
    return resp


def update_all_function_code():
    for item in lambda_functions:
        for verb in item["verbs"]:
            function_name = function_name_format(item["resource"], verb)
            update_function_code(function_name)


def function_name_format(resource, verb):
    if verb == "get":
        fn_name = camelize(f"{verb}_{pluralize(resource)}", uppercase_first_letter=False)
    elif verb == 'post':
        fn_name = camelize(f"create_{singularize(resource)}", uppercase_first_letter=False)
    else:
        fn_name = camelize(f"{verb}_{resource}", uppercase_first_letter=False)
    return fn_name


def mega_update():

    # 0 Zip all function and layer files
    zip_em_all()

    # 1 Upload functions and layers to S3
    s3_sync()  # expensive

    # 2 Publish layers from S3
    publish_layers()

    # 3 Upload function code from S3
    update_all_function_code()

    # 4 Update lambda functions to newest layers
    update_functions_to_latest_layers()



if __name__ == '__main__':
    mega_update()
