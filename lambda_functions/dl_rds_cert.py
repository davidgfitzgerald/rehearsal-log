import requests
import logging

url = 'https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem'

try:
    response = requests.get(url, allow_redirects=True)
    open('rds-combined-ca-bundle.pem', 'wb').write(response.content)
except Exception as e:
    logging.error(f"Problem downloading rds-combined-ca-bundle.pem from {url}")
