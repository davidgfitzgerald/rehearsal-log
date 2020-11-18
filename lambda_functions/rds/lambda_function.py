def lambda_handler(event, context):
    return {
        "RDS_ENDPOINT": "rehearsal-log.cdlltxeggpnv.us-east-2.rds.amazonaws.com",
        "RDS_PORT": 3306,
        "USERNAME": 'dbaccess',
        "DATABASE_NAME": "rehearsal_log",
        "SSL": {'ca': 'rds-combined-ca-bundle.pem'}
    }
