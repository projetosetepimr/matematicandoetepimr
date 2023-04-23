def test_404_not_found(client):
    assert client.get("/random_url").status_code == 404


def test_index_route(client):
    assert client.get("/").status_code == 200


def test_materials_route(client):
    assert client.get("/materiais/").status_code == 200


def test_tools_route(client):
    assert client.get("/ferramentas/").status_code == 200


def test_contacts_route(client):
    assert client.get("/contatos/").status_code == 200


def test_download_api_route(client):
    api_base = "/api/download?file_id="
    response = client.get(api_base + "random-id")

    assert response.status_code == 404


def test_get_materials_api_route(client):
    api_base = "/api/get-materials/"
    subjects = ["matematica", "fisica", "quimica"]
    grades = ["1-ano", "2-ano", "3-ano"]
    success_counter = 0

    for subject in subjects:
        for grade in grades:
            response = client.get(api_base + subject + "/" + grade)
            if (
                (response.json["I-unidade"] or not
                 response.json["I-unidade"]) and
                (response.json["II-unidade"] or not
                 response.json["II-unidade"]) and
                (response.json["III-unidade"] or not
                 response.json["III-unidade"]) and
                (response.json["IV-unidade"] or not
                 response.json["IV-unidade"])
            ):
                success_counter += 1

    assert success_counter == len(subjects) * len(grades)
