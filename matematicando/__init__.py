from flask import Flask, render_template
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

from .routes import api_bp, contacts_bp, home_bp, materials_bp


def page_not_found(e):
    return render_template("404.html"), 404


def register_blueprints(app):
    app.register_blueprint(home_bp.home_bp, url_prefix="/")
    app.register_blueprint(contacts_bp.contacts_bp, url_prefix="/contatos")
    app.register_blueprint(materials_bp.materials_bp, url_prefix="/materiais")
    app.register_blueprint(api_bp.api_bp, url_prefix="/api")


def config_gdrive_service_instance(app):
    SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
    creds = Credentials.from_service_account_info(
        {
            "private_key": app.config["GDRIVE_PRIVATE_KEY"],
            "private_key_id": app.config["GDRIVE_PRIVATE_KEY_ID"],
            "client_id": app.config["GDRIVE_CLIENT_ID"],
            "client_email": app.config["GDRIVE_CLIENT_EMAIL"],
            "token_uri": app.config["GDRIVE_TOKEN_URI"],
            "scopes": SCOPES
        }
    )

    app.config["GDRIVE_SERVICE_INSTANCE"] = build(
        "drive", "v3", credentials=creds
    )


def create_app():
    app = Flask(__name__)

    app.register_error_handler(404, page_not_found)
    app.config.from_pyfile("config.py")

    config_gdrive_service_instance(app)
    register_blueprints(app)

    return app
