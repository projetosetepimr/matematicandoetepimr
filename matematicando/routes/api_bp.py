import io

from flask import Blueprint, Response, abort, current_app, jsonify, request
from googleapiclient.errors import HttpError

api_bp = Blueprint("API", __name__)

ACCEPTED_SUBJECTS = ["matematica", "fisica", "quimica"]
ACCEPTED_GRADES = ["1-ano", "2-ano", "3-ano"]


class GoogleDriveAPIWrapper:
    def __init__(self, service_instance):
        self.service = service_instance
        self.accepted_mime_types = {
            "pdf": "application/pdf",
            "slide": "application/vnd.openxmlformats-officedocument.presenta"
            "tionml.presentation",
            "doc": "application/vnd.openxmlformats-officedocument.wordproces"
            "singml.document",
            "spreadsheet": "application/vnd.openxmlformats-officedocument.sp"
            "readsheetml.sheet"
        }
        self.subject_dirs_ids = {
            "matematica": current_app.config["GDRIVE_MATH_DIR_ID"],
            "fisica": current_app.config["GDRIVE_PHYSICS_DIR_ID"],
            "quimica": current_app.config["GDRIVE_CHEMISTRY_DIR_ID"]
        }
        self.gdrive_folder_mime_type = "application/vnd.google-apps.folder"

    def get_all_dirs_from_id(self, dir_id):
        try:
            query = f"'{dir_id}' in parents and mimeType = "\
                f"'{self.gdrive_folder_mime_type}'"

            fields = "nextPageToken, files(id, name)"
            page_token = None
            dirs = []

            while True:
                response = self.service.files().list(
                    q=query,
                    fields=fields,
                    pageToken=page_token
                ).execute()

                dirs.extend(response.get("files", []))
                page_token = response.get("nextPageToken", None)
                if page_token is None:
                    break

        except HttpError:
            dirs = None

        return dirs

    def get_all_materials_from_id(self, dir_id):
        try:
            query = f"'{dir_id}' in parents and "\
                f"(mimeType = '{self.accepted_mime_types['pdf']}' or "\
                f"mimeType = '{self.accepted_mime_types['slide']}' or "\
                f"mimeType = '{self.accepted_mime_types['doc']}' or "\
                f"mimeType = '{self.accepted_mime_types['spreadsheet']}')"

            fields = "nextPageToken, files(id, name, mimeType, webViewLink)"
            page_token = None
            materials = []

            while True:
                response = self.service.files().list(
                    q=query,
                    fields=fields,
                    orderBy="createdTime",
                    pageToken=page_token
                ).execute()

                materials.extend(response.get("files", []))
                page_token = response.get("nextPageToken", None)
                if page_token is None:
                    break

        except HttpError:
            materials = None

        return materials

    def get_materials_from_subject_and_grade(self, subject, grade_name):
        units_materials = {
            "I-unidade": [],
            "II-unidade": [],
            "III-unidade": [],
            "IV-unidade": []
        }

        grades = self.get_all_dirs_from_id(self.subject_dirs_ids[subject])
        for grade in grades:
            if grade["name"] == grade_name:
                grade_id = grade["id"]

        units = self.get_all_dirs_from_id(grade_id)
        for unit in units:
            materials_dirs = self.get_all_dirs_from_id(unit["id"])
            for material_dir in materials_dirs:
                materials = self.get_all_materials_from_id(material_dir["id"])
                self.material_checkup(materials, material_dir["name"])
                units_materials[unit["name"]].extend(materials)

        return units_materials

    def material_checkup(self, materials, material_type):
        for material in materials:
            material["materialType"] = material_type
            material["name"] = self.remove_filename_extension(
                material["name"])

    def remove_filename_extension(self, filename):
        for index, char in enumerate(
            reversed(filename), start=(len(filename)-1)*-1
        ):
            if char == '.':
                return filename[:index*-1]


@api_bp.route("/get-materials/<subject>/<grade>")
def get_materials(subject, grade):
    if subject not in ACCEPTED_SUBJECTS or grade not in ACCEPTED_GRADES:
        abort(400, ":)")

    gdrive = GoogleDriveAPIWrapper(
        current_app.config["GDRIVE_SERVICE_INSTANCE"]
    )

    response = gdrive.get_materials_from_subject_and_grade(subject, grade)

    return jsonify(response)


@api_bp.route("/download")
def download():
    try:
        file_id = request.args.get("file_id")
        gdrive = GoogleDriveAPIWrapper(
            current_app.config["GDRIVE_SERVICE_INSTANCE"]
        )

        file = gdrive.service.files().get(
            fileId=file_id,
            fields="name, mimeType"
        ).execute()

        file_content = gdrive.service.files().get_media(
            fileId=file_id).execute()

        file_stream = io.BytesIO(file_content)
        headers = {
            "Content-Disposition": f"attachment; filename={file.get('name')}"
        }

        return Response(
            file_stream,
            headers=headers,
            content_type=file.get("mimeType")
        )

    except HttpError as error:
        if error.status_code == 404:
            return jsonify({"error": "404 Not Found"}), 404
        else:
            return jsonify({"error": "500 Internal Server Error"}), 500
