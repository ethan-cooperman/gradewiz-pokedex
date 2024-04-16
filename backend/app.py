from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from database import create_connection, create_user, create_favorite, delete_favorite, check_favorite
from argon2 import PasswordHasher
import requests
from flask_caching import Cache
import sys

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
CORS(app)


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def make_cache_key(*args, **kwargs):
    path = request.path
    args = str(hash(frozenset(request.args.items())))
    return (path + args).encode('utf-8')

def extract_pokemon_id(url):
    ans = ""
    for i in range(len(url) - 2, -1, -1):
        if url[i] == "/":
            break
        ans = url[i] + ans
    return ans

@app.route("/get", methods=["GET"])
@cache.memoize(timeout=60)
def get_pokemon():
    # Get the query parameters
    offset = request.args.get("offset", default=0, type=int)
    limit = request.args.get("limit", default=100, type=int)
    page = request.args.get("page", default=1, type=int)
    pokemon_response = requests.get(f"https://pokeapi.co/api/v2/pokemon?offset={offset + limit * (page - 1)}&limit={limit}")
    conn = create_connection("pokedex.db")
    pokemon_response.raise_for_status()
    return pokemon_response.json()

@app.route("/search", methods=["GET"])
@cache.cached(timeout=60, key_prefix=make_cache_key)
def search_pokemon():
    # Get the query parameters
    offset = request.args.get("offset", default=0, type=int)
    limit = request.args.get("limit", default=100, type=int)
    page = request.args.get("page", default=1, type=int)
    keyword = request.args.get("keyword", default="", type=str)
    user_id = request.args.get("user_id", default=-1, type=int)
    pokemon_response = get_pokemon()
    conn = create_connection("pokedex.db")
    # Filter the JSON based on the keyword
    return_json = {}
    for key in pokemon_response:
        if key != "results":
            return_json[key] = pokemon_response[key]
        else:
            return_json[key] = []
            for pokemon in pokemon_response[key]:
                if keyword.lower() in pokemon["name"].lower():
                    pokemon["caught"] = check_favorite(conn, (int(user_id), int(extract_pokemon_id(pokemon["url"])))) > 0
                    return_json[key].append(pokemon)
    conn.commit()
    conn.close()
    return return_json

@app.route("/register", methods=["POST", "OPTIONS"])
def register_user():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    # Get the JSON body
    user = request.json
    if "email" not in user or "password" not in user:
        return {"result": "Email and password are required"}
    # Create a connection to the database
    conn = create_connection("pokedex.db")
    # Create a new user
    ph = PasswordHasher()
    user_id = create_user(conn, (user["email"], ph.hash(user["password"])))
    if user_id == -1:
        conn.close()
        response = jsonify({"result": "User already exists"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    conn.commit()
    conn.close()
    response = jsonify({"user_id": user_id, "result": "User created successfully"})
    return response

@app.route("/favorite", methods=["POST", "OPTIONS"])
def add_favorite():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    # Get the JSON body
    params = request.json
    # Create a connection to the database
    conn = create_connection("pokedex.db")
    # Add a new favorite
    favorite_id = create_favorite(conn, (params["user_id"], params["pokemon_id"]))
    if favorite_id == -1:
        conn.close()
        return {"result": "Favorite already exists"}
    conn.commit()
    conn.close()
    return {"favorite_id": favorite_id, "result": "Favorite created successfully"}

@app.route("/unfavorite", methods=["POST", "OPTIONS"])
def unfavorite():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    # Get the JSON body
    params = request.json
    # Create a connection to the database
    conn = create_connection("pokedex.db")
    # Add a new favorite
    delete_count = delete_favorite(conn, (params["user_id"], params["pokemon_id"]))
    conn.commit()
    if delete_count == 0:
        conn.close()
        return {"result": "Could not find that favorite to delete"}
    conn.close()
    return {"delete_count": delete_count, "result": "Favorite deleted successfully", "user_id": params["user_id"], "pokemon_id": params["pokemon_id"]}

@app.route("/login", methods=["POST", "OPTIONS"])
def login_user():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    # Get the JSON body
    user = request.json
    if "email" not in user or "password" not in user:
        return {"result": "Email and password are required"}
    # Create a connection to the database
    conn = create_connection("pokedex.db")
    # Get the user from the database
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=?", (user["email"],))
    user_data = c.fetchone()
    # Check if the user exists
    if user_data is None:
        return {"result": "User does not exist"}
    # Verify the password
    ph = PasswordHasher()
    try:
        ph.verify(user_data[2], user["password"])
    except:
        conn.close()
        return {"result": "Incorrect password"}
    conn.close()
    return {"result": "Login successful", "user_id": user_data[0]}


@app.errorhandler(404)
def page_not_found(error):

    return '<h1>Error 404<h1/> <div style="font-size: 14px; color: blue;">We unfortunately could not catch them all today</div>', 404

@app.errorhandler(500)
def page_not_found(error):
    return 'Internal server error', 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
