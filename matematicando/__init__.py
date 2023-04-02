from flask import Flask, render_template
# from .views home_bp, materials_bp


def page_not_found(e):
    render_template("404.html"), 404


def create_app():
    app = Flask(__name__)
    app.register_error_handler(404, page_not_found)
    return app
