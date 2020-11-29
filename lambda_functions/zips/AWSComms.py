import logging
import boto3
import shutil
import zipfile

# Variables
bucket = "rehearsal-log"
lambda_layers = ["DBAccessData", "inflection", "pymysql", "RDSCert"]

# Logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Clients
lambda_client = boto3.client("lambda")
s3_client = boto3.client("s3")


def zip_em_all():
    lambda_functions = [
        {'zip_from': '../practices/GET/lambda_function.py', 'zip_to': "functions/practices/getPractices.zip"},
        {'zip_from': '../practices/POST/lambda_function.py', 'zip_to': "functions/practices/createPractice.zip"},
        {'zip_from': '../exercises/GET/lambda_function.py', 'zip_to': "functions/exercises/getExercises.zip"},
        {'zip_from': '../exercises/POST/lambda_function.py', 'zip_to': "functions/exercises/createExercise.zip"}
    ]
    for fn in lambda_functions:
        with zipfile.ZipFile(fn['zip_to'], 'w') as zipit:
            zipit.write(fn['zip_from'])

    for layer in lambda_layers:
        shutil.make_archive("layers/"+layer, 'zip', "../layers/"+layer)


def print_services():
    session = boto3.session.Session()
    for service in session.get_available_services():
        print(service)


def get_s3_objects():
    return s3_client.list_objects(Bucket=bucket)["Contents"]


def upload_file(s3_key):
    try:
        s3_client.put_object(Bucket=bucket, Key=s3_key)
        print(f"Uploaded {s3_key}.")
    except Exception as e:
        raise e


def publish_layer(layer_name):
    s3_key = f'zips/layers/{layer_name}.zip'
    print(s3_key)
    response = lambda_client.publish_layer_version(
        LayerName=layer_name,
        Content={
            'S3Bucket': bucket,
            'S3Key': s3_key,
        },
        CompatibleRuntimes=["python3.8"]
    )
    return response


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
    logger.info(f"Updated {fn_name} with layers: {layers}")
    print(f"Updated {fn_name} with layers: {layers}")
    return resp


def update_functions_to_latest_layers():
    latest_layers = get_latest_layers()

    functions = lambda_client.list_functions()["Functions"]
    for fn in functions:
        layers_to_update = []
        fn_name = fn["FunctionName"]
        print(fn_name)
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
    from pathlib import Path
    for path in Path("").rglob("*.*"):
        posix_path = path.as_posix()
        upload_file(posix_path)


def update_function_code(fn_name, zip_file):
    resp = lambda_client.update_function_code(
        FunctionName=fn_name,
        ZipFile=zip_file,
        DryRun=True
    )


def mega_update():
    # 0 Zip all files [ x ]
    zip_em_all()

    # 1 Upload layer
    s3_sync()  # expensive

    # 2 Publish layer (from S3)
    resp = publish_layer('DBAccessData')
    print(resp)
    exit()

    # 3 Upload function code
    update_function_code("getPractices", "./functions/practices/getPractices.zip")

    # 4 Update lambda functions to newest layers
    update_functions_to_latest_layers()

    # print_methods(lambda_client, grep="update")
    # print_methods(s3_client)
    # upload_file("testfile.txt")
    # upload_file("zips/testfile.txt")
    # upload_file("../zips/testfile.txt")


if __name__ == '__main__':
    mega_update()
