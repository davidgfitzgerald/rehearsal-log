from pymysql import connect
from DBAccessData import rehearsal_log_db, validate_event_columns, insert, logger


def lambda_handler(event, context):
    required_columns = ["instrument", "pattern", "name"]
    validate_event_columns(event, required_columns)

    try:
        connection = connect(**rehearsal_log_db())
        logger.debug("SUCCESS: Connection to MySQL database succeeded")

        return insert(event, 'exercises', connection)
    except Exception as e:
        raise e


if __name__ == '__main__':
    ev = {
        "pattern": "RRRLLL",
        "instrument": "Drums",
        "name": "Triple Stroke Roll"
    }

    res = lambda_handler(ev, None)
    print(res)
