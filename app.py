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

@app.route('/AboutUs.html')
def AboutUs():
    return render_template('AboutUs.html')


@app.route('/steam_users_continents')
def GetSteamUsersContinents():
    data = []
    continents = mongo.db.steam_users_continents.find({})
    for cnt in continents:
        item = {
            '_id': str(cnt['_id']),
            'Continent': cnt['Continent'],
            'Users': cnt['Users'],
        }
        data.append(item)
    return jsonify(data)

@app.route('/steam_users_countries')
def GetSteamUsersCountries():
    data = []
    countries = mongo.db.steam_users_countries.find({})
    for cn in countries:
        item = {
            '_id': str(cn['_id']),
            'Country': cn['Country'],
            'Users': cn['Users'],
        }
        data.append(item)
    return jsonify(data)

@app.route('/steam_users_states')
def GetSteamUsersStates():
    data = []
    states = mongo.db.steam_users_states_us.find({})
    for st in states:
        item = {
            '_id': str(st['_id']),
            'States': st['State'],
            'Users': st['Users'],
        }
        data.append(item)
    return jsonify(data)

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
@app.route('/players/<appid>')
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

@app.route('/api/appid-mongo')
def getAppidMongo():
    appid = mongo.db.steam_metadata.find()
    data = []

    for game in appid:
        item = {
            '_id': str(game['_id']),
            'Appid': game['appid'],
            'Type': game['type'],
            'Game': game['name_x'],
            'Description': game['short_description'],
            'Metascore': game['metascore'],
            'Categories': game['categories'],
            'Genres': game['genres'],
            'Recommendations': game['recommendations'],
            'Release Date': game['release_date'],
            'Developer': game['developer'],
            'Publisher': game['publisher'],
            'Positive Reviews': game['positive'],
            'Negative Reviews': game['negative'],
            'Owners': game['owners'],
            'Avg Overall Playtime (minutes)': game['average_forever'],
            'Avg Playtime 2 Weeks (minutes)': game['average_2weeks'],
            'Median Overall Playtime (minutes)': game['median_forever'],
            'Median Playtime 2 Weeks (minutes)': game['median_2weeks'],
            'Price': game['price'],
            'Initial Price': game['initialprice'],
            'Discount (%)': game['discount'],
            'CCU': game['ccu']
        }

        data.append(item)

    return jsonify(data)

# XBOX

@app.route('/xbox_metadata')
def getXboxMetadata():
    xbox_md = mongo.db.xbox_metadata.find()
    data = []

    for xbox in xbox_md:
        item = {
            '_id': str(xbox['_id']),
            'Date': xbox['Date'],
            'Game': xbox['Game'],
            'Description': xbox['Description'],
            'Genre': xbox['Genre'],
            'Rating': xbox['Rating'],
            'Rating Notes': xbox['Rating Notes'],
            'Screen Links': xbox['Screen Links'],
        data.append(item)

    return jsonify(data)

@app.route('/xbox_top50')
def GetXboxTop50():
    data = []
    top50 = mongo.db.top50_by_country.find({})
    for top in top50:
        item = {
            '_id': str(top['_id']),
            'Date': top['Date'],
            'Country': top['Country'],
            'Rank': top['Rank'],
            'Game': top['Game'],
            'Image': top['Image']
        }
        data.append(item)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
