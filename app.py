from flask import Flask, jsonify
from flask_pymongo import PyMongo
from os import environ

app = Flask(__name__)

app.config('MONGO_URI') = environ.get('MONGODB_URI', 'mongodb://localhost:27017/steam')

mongo = PyMongo(app)

@app.route('/')
def index():
    return 'Hello World!'

@app.route('api/appid-mongo')
def getAppidsMongo():
    appids = mongo.db.appid.find()
    data = []

    for appid in appids:
        item = {
            '_id': str(appid['_id']),
            'description': appid['description'],
            'appid': appid['appid'],
            'type': appid['type'],
            'name_x': appid['name_x'],
            'short_description': appid['short_description'],
            'metascore': appid['metascore'],
            'categories': appid['categories'],
            'genres': appid['genres'],
            'recommendations': appid['recommendations'],
            'release_date': appid['release_date'],
            'name_y': appid['name_y'],
            'developer': appid['developer'],
            'publisher': appid['publisher'],
            'score_rank': appid['score_rank'],
            'positive': appid['positive'],
            'negative': appid['negative'],
            'userscore': appid['userscore'],
            'owners': appid['owners'],
            'average_forever': appid['average_forever'],
            'average_2weeks': appid['average_2weeks'],
            'median_forever': appid['median_forever'],
            'median_2weeks': appid['median_2weeks'],
            'price': appid['price'],
            'initialprice': appid['initialprice'],
            'discount': appid['discount'],
            'ccu': appid['ccu']
        }

        data.append(item)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)