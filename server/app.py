
from flask import Flask, request, jsonify
from joblib import dump, load
import random
from flask_cors import CORS
from .nlp import generate_contract
from tinydb import TinyDB, Query

# https://github.com/msiemens/tinydb
db = TinyDB('files/db.json')
table = db.table('uploads')

from .skynet import Skynet

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

def get_seed():
  return random.choices([0,1,2], [.9,.05,.05],k=1)[0]

@app.route("/")
def helloWorld():
  return "Hi from Acordo"

@app.route('/generate', methods=['POST']) 
def post_generate():
    data = request.json
    text = data['text']
    data = generate_contract(text)
    return {**data}

# upload file
@app.route('/upload', methods=['POST']) 
def post_upload():
    data = request.json
    name = data['name']
    code = data['code']

    file_name = "files/{}".format(name)
    with open(file_name, 'w') as f:
      f.write(code)

    r = Skynet.UploadFile(file_name)
    result = {'name': name, 'skylink': r}
    table.insert(result)
    print(result)
    return result

# pull file
@app.route('/all', methods=['GET']) 
def post_get():
  files =  table.all()
  return jsonify(files)

# pull file
@app.route('/pull', methods=['POST']) 
def post_pull():
    data = request.json
    name = data['skylink']
    r = Skynet.DownloadFileRequest(name)
    return {'data': r.text}
    
    
    # TODO: return data for file based on name.