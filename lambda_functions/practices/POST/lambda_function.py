import boto3
import logging
import pymysql

# TODO call new lambda function to get token?

# Logger
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Config values
RDS_ENDPOINT = "rehearsal-log.cdlltxeggpnv.us-east-2.rds.amazonaws.com"
RDS_PORT = 3306
USERNAME = 'dbaccess'
DATABASE_NAME = "rehearsal_log"

# Auth Token
rds_client = boto3.client('rds')
auth_token = rds_client.generate_db_auth_token(RDS_ENDPOINT, RDS_PORT, USERNAME)

logger.debug(f"Response from generate_db_auth_token:\n {auth_token}")

# SSL
ssl = {'ca': 'rds-combined-ca-bundle.pem'}

# Connection
connection = pymysql.connect(host=RDS_ENDPOINT, port=RDS_PORT, db=DATABASE_NAME,
                             user=USERNAME, passwd=auth_token, charset='utf8',
                             ssl=ssl, connect_timeout=5)

logger.debug("SUCCESS: Connection to MySQL database succeeded")


def lambda_handler(event, context):
    logger.debug(f"event: {event}")
    logger.debug(f"context: {context}")

    try:
        duration = event["duration"]
        instrument = event["instrument"]
        bpm = event["bpm"]
        exercise_id = event["exercise_id"]
    except KeyError as e:
        logging.error(f"Key {e} missing from payload")
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

    response = lambda_handler(ev, None)
    logging.info("Practice created")
    logging.info(f"Response: {response}")
