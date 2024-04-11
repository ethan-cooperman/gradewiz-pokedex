from flask import Flask, request
import requests
app = Flask(__name__)

@app.route("/get", methods=["GET"])
def get_pokemon():
    # Get the query parameters
    offset = request.args.get("offset", default=0, type=int)
    limit = request.args.get("limit", default=25, type=int)
    page = request.args.get("page", default=1, type=int)
    pokemon_response = requests.get(f"https://pokeapi.co/api/v2/pokemon?offset={offset + limit * (page - 1)}&limit={limit}")
    pokemon_response.raise_for_status()
    return pokemon_response.json()

@app.route("/search", methods=["GET"])
def search_pokemon():
    # Get the query parameters
    offset = request.args.get("offset", default=0, type=int)
    limit = request.args.get("limit", default=10000, type=int)
    page = request.args.get("page", default=1, type=int)
    keyword = request.args.get("keyword", default="", type=str)
    pokemon_response = requests.get(f"https://pokeapi.co/api/v2/pokemon?offset={offset + limit * (page - 1)}&limit={limit}")
    # Check if the request was successful
    pokemon_response.raise_for_status()
    # Convert the response to JSON
    pokemon_json = pokemon_response.json()
    # Filter the JSON based on the keyword
    return_json = {}
    for key in pokemon_json:
        if key != "results":
            return_json[key] = pokemon_json[key]
        else:
            return_json[key] = []
            for pokemon in pokemon_json[key]:
                if keyword.lower() in pokemon["name"].lower():
                    return_json[key].append(pokemon)
    return return_json


@app.errorhandler(404)
def page_not_found(error):

    return '<h1>Error 404<h1/> <div style="font-size: 14px; color: blue;">We unfortunately could not catch them all today</div>', 404

@app.errorhandler(500)
def page_not_found(error):
    return 'Internal server error', 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
