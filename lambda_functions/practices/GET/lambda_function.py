from pymysql import connect
from DBAccessData import rehearsal_log_db, select_all, logger, access_data
# test


def lambda_handler(event, context):
    try:
        connection = connect(**rehearsal_log_db())
        logger.debug("SUCCESS: Connection to MySQL database succeeded")
        try:
            return select_all('practices', connection, outer_join='exercises')
        except Exception as e:
            raise e
    except FileNotFoundError as e:
        raise FileNotFoundError(f"Cannot find {access_data['SSL']['ca']}") from e
    except Exception as e:
        raise e


if __name__ == '__main__':
    print(lambda_handler(None, None))
