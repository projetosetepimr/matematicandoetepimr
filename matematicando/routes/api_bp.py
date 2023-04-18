from flask import Blueprint


api_bp = Blueprint("API", __name__)


@api_bp.route("/")
def api():
    return "API is working!"
