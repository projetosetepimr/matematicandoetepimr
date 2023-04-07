const eteslider = document.querySelector("div#slider")
const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")
const indexOutput = document.getElementById("index-output")
const divLine = document.getElementById("line")
const baseEteDir = "/static/img/etepimr-slider"
const max = 32

const colorList = [
    "#57829C",
    "#84B55B",
    "#486750",
    "#B4E599",
    "#7E95A7",
    "#2F9A82",
    "#E4DCA3"
]

let index = 0

function etepimrSlide(index) {
    eteslider.style.backgroundImage = `url(${baseEteDir}/${index+1}.jpg)`
    eteslider.classList.add("image-fade")

    setTimeout(() => {
        eteslider.classList.remove("image-fade")
    }, 1000)
}

function updateOutputIndex(index) {
    indexOutput.innerHTML = `${index+1} / ${max}`    
}

function updateLineColor(line) {
    line.style.backgroundColor = colorList[Math.floor(Math.random() * colorList.length)]
}

arrowLeft.addEventListener("click", () => {
    index--

    if (index < 0)
        index = max - 1

    etepimrSlide(index)
    updateOutputIndex(index)
    updateLineColor(divLine)
})

arrowRight.addEventListener("click", () => {
    index++

    if (index > max - 1)
        index = 0

    etepimrSlide(index)
    updateOutputIndex(index)
    updateLineColor(divLine)
})

indexOutput.innerHTML = `1 / ${max}`

setInterval(() => {
    index++

    if (index > max - 1)
        index = 0

    etepimrSlide(index)
    updateOutputIndex(index)
    updateLineColor(divLine)
}, 5000)
