from flask import Blueprint, render_template

tools_bp = Blueprint("Tools", __name__)


@tools_bp.route("/")
def tools():
    return render_template("tools.html")
