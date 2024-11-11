from flask import Flask, render_template, url_for, request, flash, session, redirect, abort, g
import json
import requests 
from flask_cors import CORS
import json
from flask_socketio import SocketIO



app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)
socketio = SocketIO(app)


thread = None
NS = "/test"


@app.route("/")


def index():
    
   
    return render_template('index.html')

@app.route('/ask', methods = ['GET','POST'])
def ask():
    if request.method == "POST":
        
        data = request.get_json()
        json_data = json.dumps(data)
        new_data = json.loads(json_data)
        print(url_for('ask'))
        print(new_data['title'])
        print(new_data['body'])
        print(new_data['userId'])
        
        
        
        
        
    return data


@app.route('/ask_fight')
def ask_fight():    
    url = "https://api.travelpayouts.com/v2/prices/latest"
    querystring = {"currency":"rub","period_type":"year","page":"1","limit":"60","show_to_affiliates":"true","sorting":"price","trip_class":"0"}

    headers = {'x-access-token': 'bc99cead7d4f7cbf0b85723bcb406ea0'}

    response = requests.request("GET", url, headers=headers, params=querystring)
    print('Some starting')
    print(response.text)

    return response.text
  
@app.route('/cheapest', methods = ["GET", "POST"])
def cheapest():
    url = "https://api.travelpayouts.com/v1/prices/cheap"
    data = request.get_json()
    querystring = data
    headers = {'x-access-token': 'bc99cead7d4f7cbf0b85723bcb406ea0'}
    response = requests.request('GET', url, headers=headers, params = querystring)
    print(url_for('cheapest'))
    print(response.text)
    
    return response.text
    
@app.route('/another', methods = ["GET", "POST"])
def another():
    url = "https://api.travelpayouts.com/v1/prices/calendar"
    data = request.get_json()
    querystring = data
    headers = {'x-access-token': 'bc99cead7d4f7cbf0b85723bcb406ea0'}
    response = requests.request('GET', url, headers=headers, params = querystring)
    print(url_for('another'))
    print(response.text)
    
    return response.text


@app.route('/alltickets', methods = ["GET", "POST"])
def alltickets():
    url = "https://api.travelpayouts.com/v2/prices/month-matrix"
    data = request.get_json()
    querystring = data
    headers = {'x-access-token': 'bc99cead7d4f7cbf0b85723bcb406ea0'}
    response = requests.request('GET', url, headers=headers, params = querystring)
    print(url_for('alltickets'))
    print(response.text)
    
    return response.text

@app.route('/ql', methods = ["GET", "POST"])
def ql():
    print(url_for('ql'))
    url = "http://api.travelpayouts.com/graphql/v1/query/"    
    data = request.get_json()    
    
    print('Answer for clients query')
    print(data)
    headers = {'X-Access-Token': 'bc99cead7d4f7cbf0b85723bcb406ea0', 'Content-Type': 'application/json'}
    response = requests.post(url, data = data, headers = headers)
    
    print(response.text)    
    return response.text
    
@app.route('/get_airlines', methods = ["GET", "POST"])
def get_airlines():
    print(url_for('get_airlines'))
    url = 'http://api.travelpayouts.com/data/ru/airlines.json'
    response = requests.request('GET', url )
    print('Getting airlines data')
    
    return response.text

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)
