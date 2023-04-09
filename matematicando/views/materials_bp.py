from flask import Blueprint, render_template, abort


materials_bp = Blueprint("Materials", __name__)

SUBJECTS_MAPPER = {
    "matematica": ["Matemática", "math"],
    "fisica": ["Física", "physics"],
    "quimica": ["Química", "chemistry"]
}
GRADES_MAPPER = {
    "1-ano": ["1° Ano", "first-year"],
    "2-ano": ["2° Ano", "second-year"],
    "3-ano": ["3° Ano", "third-year"]
}


@materials_bp.route("/")
@materials_bp.route("/<subject>/<grade>")
def materials(subject=None, grade=None):
    if subject and grade:
        if subject not in SUBJECTS_MAPPER.keys() or grade not in GRADES_MAPPER.keys():
            abort(400, ":)")

        return render_template(
            "materials-l2.html",
            subject_name=SUBJECTS_MAPPER[subject][0],
            grade_name=GRADES_MAPPER[grade][0],
            subject_background=SUBJECTS_MAPPER[subject][1],
            grade_line_color=GRADES_MAPPER[grade][1]
        )
    
    return render_template("materials.html")
