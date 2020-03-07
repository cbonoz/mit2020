
from flask import Flask, request, jsonify
from joblib import dump, load
import random
from flask_cors import CORS
from .nlp import generate_contract

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
    print(r)
    return {'name': name}

# pull file
@app.route('/pull', methods=['POST']) 
def post_get():
    data = request.json
    name = data['name']
    # TODO: return data for file based on name.