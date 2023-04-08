from flask import Blueprint, render_template


materials_bp = Blueprint("Materials", __name__)


@materials_bp.route("/")
def materials():
    return render_template("materials.html")
