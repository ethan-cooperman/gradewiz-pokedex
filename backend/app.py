from flask import Flask, request, jsonify
import requests
app = Flask(__name__)
@app.route("/pokemon", methods=["GET"])
def get_pokemon():
    offset = request.args.get("offset", default=0, type=int)
    limit = request.args.get("limit", default=25, type=int)
    page = request.args.get("page", default=1, type=int)
    pokemon_response = requests.get(f"https://pokeapi.co/api/v2/pokemon?offset={offset + limit * (page - 1)}&limit={limit}")
    return pokemon_response.json()


@app.errorhandler(404)
def page_not_found(error):
    return 'We unfortunately could not catch them all today', 404

@app.errorhandler(500)
def page_not_found(error):
    return 'Internal server error', 500