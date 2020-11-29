from pymysql import connect
from DBAccessData import rehearsal_log_db, validate_event_columns, insert, logger


def lambda_handler(event, context):
    required_columns = ["duration", "exercise_id"]
    validate_event_columns(event, required_columns)

    try:
        connection = connect(**rehearsal_log_db())
        logger.debug("SUCCESS: Connection to MySQL database succeeded")

        return insert(event, 'practices', connection)
    except Exception as e:
        raise e


if __name__ == '__main__':
    ev = {
        "duration": "999",
        "bpm": "99",
        "exercise_id": "1"
    }

    res = lambda_handler(ev, None)
    print(res)
