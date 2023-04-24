import pytest

from matematicando import create_app


@pytest.fixture()
def app():
    app = create_app()
    app.config["TESTING"] = True

    return app


@pytest.fixture()
def gdrive_instance(app):
    return app.config["GDRIVE_SERVICE_INSTANCE"]


@pytest.fixture()
def client(app):
    return app.test_client()
