#!/usr/bin/env python

import shutil
import zipfile

functions = [
    {'zip_from': '../practices/GET/lambda_function.py', 'zip_to': "functions/practices/getPractices.zip"},
    {'zip_from': '../practices/POST/lambda_function.py', 'zip_to': "functions/practices/createPractice.zip"},
    {'zip_from': '../exercises/GET/lambda_function.py', 'zip_to': "functions/exercises/getExercises.zip"},
    {'zip_from': '../exercises/POST/lambda_function.py', 'zip_to': "functions/exercises/createExercise.zip"}
]

layers = ["DBAccessData", "inflection", "pymysql", "RDSCert"]

for fn in functions:
    with zipfile.ZipFile(fn['zip_to'], 'w') as zipit:
        zipit.write(fn['zip_from'])

for layer in layers:
    shutil.make_archive("layers/"+layer, 'zip', "../layers/"+layer)
