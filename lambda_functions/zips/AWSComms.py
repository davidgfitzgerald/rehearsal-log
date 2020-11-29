import logging
import boto3

# Variables
bucket = "rehearsal-log"

# Logging
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Clients
lambda_client = boto3.client("lambda")
s3_client = boto3.client("s3")


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


def publish_layer(s3_key):
    layer_name = s3_key.split("/")[-1].split('.zip')[0]
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


def sync():
    from pathlib import Path

    for path in Path("zips").rglob("*.*"):
        upload_file(path.as_posix())


def update_function(fn_name, zip_file):
    resp = lambda_client.update_function_code(
        FunctionName=fn_name,
        ZipFile=zip_file,
        DryRun=True
    )


def mega_update():
    # sync() # expensive

    # 1 Upload layer
    # 2 Publish layer
    # 3 Set new version on lambda function

    update_function("getPractices", "./functions/practices/getPractices.zip")

    print_methods(lambda_client, grep="update")
    # print_methods(s3_client)
    # upload_file("testfile.txt")
    # upload_file("zips/testfile.txt")
    # upload_file("../zips/testfile.txt")
    exit()

    update_functions_to_latest_layers()
    exit()

    resp = publish_layer('layers/DBAccessData.zip')
    dbaccess_version_arn = resp['LayerVersionArn']
    print(dbaccess_version_arn)


if __name__ == '__main__':
    mega_update()
