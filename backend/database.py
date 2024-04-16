import sqlite3
from sqlite3 import Error

def print_log(message):
    with open("log.txt", "a") as log_file:
        log_file.write(message + "\n")

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn

def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def create_user(conn, user):
    """
    Create a new user into the users table
    :param conn:
    :param user:
    :return: user id
    """
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO users (email, password) VALUES (?, ?)", user)
        return cur.lastrowid
    except sqlite3.IntegrityError:
        return -1
    

def create_favorite(conn, favorite):
    """
    Create a new favorite into the favorites table
    :param conn:
    :param favorite:
    :return: favorite id
    """
    sql = ''' INSERT INTO favorites(user_id,pokemon_id)
              VALUES(?,?) '''
    try:
        cur = conn.cursor()
        cur.execute(sql, favorite)
        return cur.lastrowid
    except sqlite3.IntegrityError:
        return -1

def delete_favorite(conn, favorite):
    """
    Create a new favorite into the favorites table
    :param conn:
    :param favorite:
    :return: favorite id
    """
    sql = ''' DELETE FROM favorites WHERE user_id=? AND pokemon_id=? '''
    cur = conn.cursor()
    cur.execute(sql, favorite)
    return cur.rowcount

def check_favorite(conn, favorite):
    """
    Check if a favorite is in the favorites table
    :param conn:
    :param favorite:
    :return: favorite id
    """
    sql = ''' SELECT * FROM favorites WHERE user_id=? AND pokemon_id=? '''
    cur = conn.cursor()
    cur.execute(sql, favorite)
    return len(cur.fetchall())

def main():
    database = "pokedex.db"

    sql_users_table = """ CREATE TABLE IF NOT EXISTS users (
                                        id integer PRIMARY KEY,
                                        email text NOT NULL UNIQUE,
                                        password text NOT NULL,
                                        created datetime DEFAULT CURRENT_TIMESTAMP
                                    ); """
    
    sql_favorites_table = """ CREATE TABLE IF NOT EXISTS favorites (
                                        id integer PRIMARY KEY,
                                        user_id integer NOT NULL,
                                        pokemon_id integer NOT NULL,
                                        created datetime DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (user_id) REFERENCES users (id)
                                        UNIQUE(user_id, pokemon_id)
                                    ); """
    

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create users table
        create_table(conn, sql_users_table)
        create_table(conn, sql_favorites_table)
        c = conn.cursor()
    else:
        print("Error! cannot create the database connection.")


if __name__ == '__main__':
    main()
