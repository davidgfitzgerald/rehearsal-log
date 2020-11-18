import json
import boto3
import logging
import pymysql

# Logger
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Clients
client = boto3.client('lambda')
rds_client = boto3.client('rds')


def lambda_handler(event, context):
    try:
        duration = event["duration"]
        instrument = event["instrument"]
        bpm = event["bpm"]
        exercise_id = event["exercise_id"]
    except KeyError as e:
        logging.error(f"Key {e} missing from payload")
        raise e

    try:
        # Get DB Access Data
        response = client.invoke(
            FunctionName='arn:aws:lambda:us-east-2:521286727825:function:DBAccessData',
            InvocationType='RequestResponse'
        )
        access_data = json.load(response['Payload'])
        logger.debug("SUCCESS: DBAccessData Lambda function invoked")

        # Get DB Auth Token
        auth_token = rds_client.generate_db_auth_token(access_data["RDS_ENDPOINT"], access_data["RDS_PORT"],
                                                       access_data["USERNAME"])
        logger.debug("SUCCESS: auth token generated")

        # Connect to DB
        connection = pymysql.connect(host=access_data["RDS_ENDPOINT"], port=access_data["RDS_PORT"],
                                     db=access_data["DATABASE_NAME"], user=access_data["USERNAME"],
                                     passwd=auth_token, ssl=access_data["SSL"],
                                     connect_timeout=5, charset='utf8', )
        logger.debug("SUCCESS: Connection to MySQL database succeeded")

    except Exception as e:
        raise e

    with connection.cursor(pymysql.cursors.DictCursor) as cur:
        try:
            create_practice_query = "INSERT INTO practices (duration, instrument, bpm, exercise_id) " \
                        "values (%s, %s, %s, %s)"
            cur.execute(create_practice_query, (duration, instrument, bpm, exercise_id))
            connection.commit()

            get_practice_query = "SELECT * FROM practices WHERE practice_id=%s"
            cur.execute(get_practice_query, cur.lastrowid)

            for row in cur:
                return row

        except Exception as e:
            connection.rollback()
            raise e


if __name__ == '__main__':
    ev = {
        "duration": "999",
        "instrument": "drums",
        "bpm": "99",
        "exercise_id": "1"
    }

    res = lambda_handler(ev, None)
    logging.info("Practice created")
    logging.info(f"Response: {res}")
