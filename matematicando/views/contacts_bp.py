from flask import Blueprint, render_template


contacts_bp = Blueprint("Contacts", __name__)

EMAIL = "matematicandoetepimr@gmail.com"


@contacts_bp.route("/")
def contacts():
    return render_template("contacts.html", email=EMAIL)
