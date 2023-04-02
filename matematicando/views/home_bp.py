from flask import Blueprint, render_template


home_bp = Blueprint("Homepage", __name__)


@home_bp.route("/")
def home():
    return render_template("home.html")
