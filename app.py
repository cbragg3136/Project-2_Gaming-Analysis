from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo, DESCENDING, ASCENDING
from os import environ
import datetime
import re


app = Flask(__name__)

app.config['MONGO_URI'] = environ.get(
    'MONGODB_URI', 'mongodb://localhost:27017/steam_project_db')

mongo = PyMongo(app)
steamdb = mongo.cx['steamdb']
xboxdb = mongo.cx['xboxdb']

# Routes to html
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/MSGames.html')
def MSGames():
    return render_template('MSGames.html')

@app.route('/MSDetail.html')
def MSDetail():
    return render_template('MSDetail.html')

@app.route('/PCGames.html')
def PCGames():
    return render_template('PCGames.html')

@app.route('/AboutUs.html')
def AboutUs():
    return render_template('AboutUs.html')

@app.route('/top100plot.html')
def top100plot():
    return render_template('top100plot.html')

@app.route('/steam.html')
def steamhtml():
    return render_template('steam.html')

@app.route('/MSMap.html')
def msmaphtml():
    return render_template('MSMap.html')

@app.route('/PCMap.html')
def PCmaphtml():
    return render_template('PCMap.html')

# STEAM

# route to return steam user location by continent
@app.route('/api/steam_users_continents')
def GetSteamUsersContinents():
    data = []
    continents = steamdb.steam_users_continents.find({})
    for cnt in continents:
        item = {
            '_id': str(cnt['_id']),
            'Continent': cnt['Continent'],
            'Users': cnt['Users'],
        }
        data.append(item)
    return jsonify(data)

# route to return steam user location by country
@app.route('/api/steam_users_countries')
def GetSteamUsersCountries():
    data = []
    countries = steamdb.steam_users_countries.find({})
    for cn in countries:
        item = {
            '_id': str(cn['_id']),
            'Country': cn['Country'],
            'Users': cn['Users'],
        }
        data.append(item)
    return jsonify(data)

# route to return user location by US state
@app.route('/api/steam_users_states')
def GetSteamUsersStates():
    data = []
    states = steamdb.steam_users_states_us.find({})
    for st in states:
        item = {
            '_id': str(st['_id']),
            'States': st['State'],
            'Users': st['Users'],
        }
        data.append(item)
    return jsonify(data)


# route to return steam all player data
@app.route('/api/players')
def show_player_data():
    data = []
    games = steamdb.players.find({})
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

# route to return steam player data by appid
@app.route('/api/players/<appid>')
def get_players_appid(appid):
    data = []
    documents = steamdb.players.find({"appid":appid})
    for d in documents:
        item = {
            'Name': d['Name'],
            'Current Players': d['Current Players'],
            'Time': datetime.datetime.strftime(d['Time'],'%Y-%m-%d %X')
        }
        data.append(item)
    return jsonify(data)

# route to get all steam titles that have appeared in the top top100
# returns name and appid sorted by name
@app.route('/api/top100-list/')
def get_top100_list():
    data = []
    documents = steamdb.players.aggregate([{"$group":
        { "_id": { "Name": "$Name", "appid": "$appid"}}},
        {"$sort": {"_id":1}}])

    for d in documents:
        item = {
            'Name': d["_id"]["Name"],
            'appid': d["_id"]["appid"]
        }
        data.append(item)
    return jsonify(data)

# route to most recent top100
# returns name and appid sorted by number of players
@app.route('/api/current_100/')
def get_current_100():
    data = []
    documents = steamdb.players.find().sort([("Time",DESCENDING),("Current Players",DESCENDING)]).limit(100)

    for d in documents:
        item = {
            'Name': d['Name'],
            'Appid': d['appid'],
            'Current Players': d['Current Players'],
            'Peak Players': d['Peak Players'],
            'Time': d['Time'],
            'Link': d['Link']
        }
        data.append(item)
    return jsonify(data)

# route to return steam metadata for all 'games'
@app.route('/api/steam_metadata')
def getAppidMongo():
    appid = steamdb.steam_metadata.find({})
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

# route to return a search selection of steam game data
# search on game category
@app.route('/api/steam_metadata/category/<category>')
def getSteamCategory(category):
    search = r".*"+category+r".*"
    appid = steamdb.steam_metadata.find({"categories":{"$regex":search,"$options":"i"}})
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
            'Positive': game['positive'],
            'Negative': game['negative'],
            'Owners': game['owners'],
            'Average Playtime': game['average_forever'],
            'Median Playtime': game['median_forever'],
            'Price': game['price'],
        }

        data.append(item)

    return jsonify(data)

# route to return a search selection of steam game data
# search on game genre
@app.route('/api/steam_metadata/genre/<genre>')
def getSteamGenre(genre):
    search = r".*"+genre+r".*"
    appid = steamdb.steam_metadata.find({"genres":{"$regex":search,"$options":"i"}})
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
            'Positive': game['positive'],
            'Negative': game['negative'],
            'Owners': game['owners'],
            'Average Playtime': game['average_forever'],
            'Median Playtime': game['median_forever'],
            'Price': game['price'],
        }

        data.append(item)

    return jsonify(data)

# route to return a search selection of steam game data
# search on game genre
@app.route('/api/steam_metadata/name/<name>')
def getSteamName(name):
    search = r".*"+name+r".*"
    appid = steamdb.steam_metadata.find({"name_x":{"$regex":search,"$options":"i"}})
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
            'Positive': game['positive'],
            'Negative': game['negative'],
            'Owners': game['owners'],
            'Average Playtime': game['average_forever'],
            'Median Playtime': game['median_forever'],
            'Price': game['price'],
        }

        data.append(item)

    return jsonify(data)

# returns a single record containing the features
@app.route('/api/steam_no_us_users')
def getSteamNoUsUsers():
    rankone = steamdb.steam_no_us_users.find_one()
    item = {'features':rankone['features']}
    # features = []
    # for feature in rankone['features']:
    #     print(feature)
    #     features = features.append(feature)
    # item = {'features': features}
    data = [item['features'][i] for i in item['features']]
    return jsonify({'features':data})


# XBOX
# route to return xbox metadata
@app.route('/api/xbox_metadata')
def getXboxMetadata():
    xbox_md = xboxdb.xbox_metadata.find({})
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
        }
        data.append(item)

    return jsonify(data)

# route to return xbox top50 games
@app.route('/api/xbox_top50')
def GetXboxTop50():
    top50 = xboxdb.top50_by_country.find({})
    data = []
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

# route to return the top xbox games by country
# returns a single record containing the features
@app.route('/api/xbox_rank1games')
def GetXboxRankOne():
    rankone = xboxdb.xbox_rank_one_games.find_one()
    item = {'features':rankone['features']}
    # features = []
    # for feature in rankone['features']:
    #     print(feature)
    #     features = features.append(feature)
    # item = {'features': features}
    data = [item['features'][i] for i in item['features']]
    return jsonify({'features':data})

if __name__ == '__main__':
    app.run(debug=True)
