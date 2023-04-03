from flask import Flask, render_template
from .views import home_bp


def page_not_found(e):
    return render_template("404.html"), 404


def _register_blueprints(app: Flask):
    app.register_blueprint(home_bp.home_bp, url_prefix="/")


def create_app():
    app = Flask(__name__)
    app.register_error_handler(404, page_not_found)
    _register_blueprints(app)
    return app
