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
            sql_query = 'SELECT * from practices'
            cur.execute(sql_query)
            connection.commit()

            return cur.fetchall()

        except Exception as e:
            connection.rollback()
            raise e


if __name__ == '__main__':
    lambda_handler(None, None)
