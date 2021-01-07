from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ

app = Flask(__name__)

app.config['MONGO_URI'] = environ.get(
    'MONGODB_URI', 'mongodb://localhost:27017/steam_project_db')

mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/MSGames.html')
def MSGames():
    return render_template('MSGames.html')

@app.route('/PCGames.html')
def PCGames():
    return render_template('PCGames.html')

@app.route('/api/players')
def show_player_data():
    data = []
    games = mongo.db.players.find({})
    for g in games:
        item = {
            '_id': str(g['_id']),
            'Name': g['Name'],
            'Current Players': g['Current Players'],
            'Peak Players': g['Peak Players'],
            'Time': g['Time'],
            'Link': g['Link']
        }
        data.append(item)
    return jsonify(data)

@app.route('/api/appid-mongo')
def getAppidMongo():
    appid = mongo.db.steam_metadata.find()
    data = []

    for game in appid:
        item = {
            '_id': str(game['_id']),
            'appid': game['appid'],
            'type': game['type'],
            'name_x': game['name_x'],
            'short_description': game['short_description'],
            'metascore': game['metascore'],
            'categories': game['categories'],
            'genres': game['genres'],
            'recommendations': game['recommendations'],
            'release_date': game['release_date'],
            'developer': game['developer'],
            'publisher': game['publisher'],
            'positive': game['positive'],
            'negative': game['negative'],
            'owners': game['owners'],
            'average_forever': game['average_forever'],
            'average_2weeks': game['average_2weeks'],
            'median_forever': game['median_forever'],
            'median_2weeks': game['median_2weeks'],
            'price': game['price'],
            'initialprice': game['initialprice'],
            'discount': game['discount'],
            'ccu': game['ccu']
        }

        data.append(item)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
