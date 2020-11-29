from pymysql import connect
from DBAccessData import rehearsal_log_db, select_all, logger


def lambda_handler(event, context):
    try:
        connection = connect(**rehearsal_log_db())
        logger.debug("SUCCESS: Connection to MySQL database succeeded")

        return select_all('exercises', connection)
    except Exception as e:
        raise e


if __name__ == '__main__':
    print(lambda_handler(None, None))
