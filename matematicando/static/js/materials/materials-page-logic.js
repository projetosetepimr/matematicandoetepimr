const baseMaterialsIconPath = "/static/img/materials/materials-lv2/content-type-icon/"
const materialsRoute = "/api/get-materials/"
const downloadRoute = "/api/download?file_id="

const loadingDivs = document.querySelectorAll("div.content-block > div.loading")
const httpErrorDiv = document.getElementById("http-error")

const emptyUnit = 
`
    <div class="empty-unit">
        <i class="ri-folder-line"></i>
        <p>Unidade Vazia</p>
    </div>
`

const unitsDiv = {
    "I-unidade": document.getElementById("I-unidade"),
    "II-unidade": document.getElementById("II-unidade"),
    "III-unidade": document.getElementById("III-unidade"),
    "IV-unidade": document.getElementById("IV-unidade")
}

const mimeTypeToPath = {
    "application/pdf": 
    baseMaterialsIconPath + "pdf.png",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": 
    baseMaterialsIconPath + "ppt.png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": 
    baseMaterialsIconPath + "doc.png",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    baseMaterialsIconPath + "xls.png"
}

const materialTypeToCSSId = {
    "atividade": "homework",
    "material_de_apoio": "supporting-materials",
    "revisao": "review",
    "outros": "other"
}

function disableAllLoadingDivs() {
    for (let i=0; i<loadingDivs.length; i++) {
        loadingDivs[i].style.display = "none"
    }
}

function getSubjectAndGradeFromPathname(pathname) {
    let slashIndex = pathname.indexOf("/")
    let arguments = pathname.slice(slashIndex+1, pathname.length)
    
    slashIndex = arguments.indexOf("/")
    arguments = pathname.slice(slashIndex+2, pathname.length)

    return arguments
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showAllUnitsMaterials(jsonData) {
    for (let unit in unitsDiv) {
        if (jsonData[unit].length == 0) {
            unitsDiv[unit].innerHTML = emptyUnit
        } else {
            for (let index in jsonData[unit]) {
                unitsDiv[unit].style.height = "auto"
                unitsDiv[unit].innerHTML += 
                `
                    <div class="content">
                        <div class="content-type-icon-background">
                            <img src="${mimeTypeToPath[jsonData[unit][index].mimeType]}" 
                            alt="Material Icon">
                        </div>
                        <div class="content-name">
                            <p title="${jsonData[unit][index].name}" 
                            onclick="newTabRedirectTo('${jsonData
                                [unit][index].webViewLink}')">${jsonData[unit][index].name}
                            </p>
                        </div>
                        <div class="download-and-content-color">
                            <div onclick="redirectTo('${downloadRoute + jsonData
                                [unit][index].id}')" class="download-background">
                                <i class="ri-download-line"></i>
                            </div>
                            <div class="content-type-color"
                            id="${materialTypeToCSSId[jsonData[unit][index].materialType]}">
                            </div>
                        </div>
                    </div>
                `
                await sleep(100)
            }
        }
    }
}

const arguments = getSubjectAndGradeFromPathname(document.location.pathname)
const response = fetch(materialsRoute + arguments)
    .then(data => {return data.json()})
    .then(materials => {
        disableAllLoadingDivs()
        showAllUnitsMaterials(materials)
    })
    .catch(e => {
        httpErrorDiv.style.display = "flex"
    })
