import boto3
import logging
import pymysql

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
    with connection.cursor(pymysql.cursors.DictCursor) as cur:
        try:
            sql_query = 'SELECT * from practices'
            cur.execute(sql_query)
            connection.commit()

            practices = cur.fetchall()
            for practice in practices:
                print(practice)

            return practices

        except Exception as e:
            connection.rollback()
            raise e


if __name__ == '__main__':
    lambda_handler(None, None)
