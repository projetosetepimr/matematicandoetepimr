from flask import Blueprint, render_template


home_bp = Blueprint("Homepage", __name__)

NUMBER_OF_IMAGES = 32


@home_bp.route("/")
def home():
    return render_template("home.html", number_of_indices=NUMBER_OF_IMAGES)
