# gradewiz-pokedex

## Description

This is my pokedex for the GradeWiz Interview Process. Contained in this repository is a backend that serves a RESTful API using Python Flask and a frontend that renders a pokedex page using React. Pokemon data comes from PokeAPI. In order to store user data, the backend uses a SQLite database. It is highly recommended to use the page with an account in order to catch pokemon. This page is somewhat slow at the moment due to limitations with vanilla React and lack of pagination, but user functionality will work as expected given a few seconds.

## Features

### User Authentication

A simple user authentification system is implemented. Users can sign up, log in, and log out. The backend uses the argon hashing algorithm to hash passwords before storing them in the database.

### Searching

The sidebar allows users to search for pokemon by name. The search is case-insensitive and will return all pokemon that contain the search query in their name.

### "Catch" Pokemon

Clicking the pokeball icon will "catch" the pokemon. The pokemon will then be added to the user's pokedex. The user can release pokemon from their pokedex by clicking the pokeball icon again. Caught Pokemon can be viewed in the pokedex by changing the dropdown in the sidebar. If the user is not logged in, pokemon cannot be caught. Pokemon that have not been caught can also be viewed in the pokedex.

### Pokemon Details

Every Pokemon card shows the Pokemon's name, image, and type. The cards also have a description including their HP and abilities. The description is fetched from the PokeAPI.

## Installing and Running the Pokedex

Clone the repository with

```bash
git clone REPOSITORY_URL
```

### Backend

Navigate to the backend folder and create a new virtual environment with

```bash
python3 -m venv .venv
```

Activate the virtual environment with

```bash
source .venv/bin/activate
```

Install the dependencies with

```bash
pip install -r requirements.txt
```

Run database.py to initialize a local database

```bash
python database.py

```

Run the backend with

```bash
flask run
```

The backend should now be running on localhost:5000

### Frontend

Install dependencies with

```bash
npm install
```

Run the frontend with

```bash
npm run dev
```

The Pokedex should now be running on localhost:5173
