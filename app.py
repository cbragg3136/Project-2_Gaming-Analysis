from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ
import datetime


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

@app.route('/top100plot.html')
def top100plot():
    return render_template('top100plot.html')

# route to return all player data
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

# route to return player data by appid
@app.route('/api/players/<appid>')
def get_players_appid(appid):
    data = []
    documents = mongo.db.players.find({"appid":appid})
    for d in documents:
        item = {
            'Name': d['Name'],
            'Current Players': d['Current Players'],
            'Time': datetime.datetime.strftime(d['Time'],'%Y-%m-%d %X')
        }
        data.append(item)
    return jsonify(data)

# route to get all titles that have appeared in the top top100
# returns name and appid sorted by name
@app.route('/api/top100-list/')
def get_top100_list():
    data = []
    documents = mongo.db.players.aggregate([{"$group":
        { "_id": { "Name": "$Name", "appid": "$appid"}}},
        {"$sort": {"_id":1}}])

    for d in documents:
        item = {
            'Name': d["_id"]["Name"],
            'appid': d["_id"]["appid"]
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
