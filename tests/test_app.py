def test_is_app_run(client):
    assert client.get("/").status_code == 200


def test_env_variables_are_set(app):
    assert app.config["GDRIVE_PRIVATE_KEY"]
    assert app.config["GDRIVE_PRIVATE_KEY_ID"]
    assert app.config["GDRIVE_CLIENT_ID"]
    assert app.config["GDRIVE_CLIENT_EMAIL"]
    assert app.config["GDRIVE_TOKEN_URI"]
    assert app.config["GDRIVE_MATH_DIR_ID"]
    assert app.config["GDRIVE_PHYSICS_DIR_ID"]
    assert app.config["GDRIVE_CHEMISTRY_DIR_ID"]
