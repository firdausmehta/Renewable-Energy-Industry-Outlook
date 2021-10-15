# import dependencies
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv
load_dotenv()


# create the flask app
app = Flask(__name__, static_url_path="/static")

# app configuration
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db setup
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
State_Energy = Base.classes.state_energy
Us_Energy = Base.classes.us_energy

# View routes
@app.route("/")
def landing_page():
    return render_template("index.html", API_KEY=os.environ["API_KEY"])


# data routes
# state energy route
@app.route("/api/state_energy")
def get_state_energy_data():
    sel = [
        State_Energy.state,
        State_Energy.year,
        State_Energy.produced_renewable,
        State_Energy.total_consumed,
        State_Energy.population,
        State_Energy.energy_price,
        State_Energy.difference
    ]

    state_results = db.session.query(*sel).all()
    return jsonify(state_results)

# create us energy route
@app.route("/api/us_energy")
def get_us_energy_data():
    sel = [
        Us_Energy.year,
        Us_Energy.produced_renewable,
        Us_Energy.total_consumed,
        Us_Energy.gdp,
        Us_Energy.population,
        Us_Energy.energy_price,
        Us_Energy.difference
    ]
    us_results = db.session.query(*sel).all()
    return jsonify(us_results)

# run the app
if __name__ == "__main__":
    app.run(debug=True)