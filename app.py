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

# get the heroku database url from environment
db_uri = os.environ["DATABASE_URL"]
