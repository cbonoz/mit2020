
from flask import Flask, request, jsonify
from joblib import dump, load
import random
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
cors = CORS(app, resources={r"/trade": {"origins": "*"}})
clf = load('../clf_no_extra.joblib') 

print('loaded', clf)

def get_seed():
  return random.choices([0,1,2], [.9,.05,.05],k=1)[0]

@app.route("/")
def helloWorld():
  return "Hi from Spoofdoctor"

@app.route('/trade', methods=['POST']) 
def post_trade():
    data = request.json
    print(data)
    rows = pd.DataFrame(data, index=[0])
    print('rows',rows)
    # pred = clf.predict_proba(rows)
    # print(pred)

    # TODO: predict and response prediction
    result = {'data': data, 'result': get_seed()}
    print('data', data, result)
    return jsonify(result)