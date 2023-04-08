const eteSlider = document.querySelector("div#ete-slider")
const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")
const indexOutput = document.getElementById("index-output")
const colorOutputLine = document.getElementById("color-output-line")
const eteImgDir = "/static/img/etepimr-slider"
const maxImages = 32
let currentIndex = 0

const colorList = [
    "#57829C", "#84B55B",
    "#486750", "#B4E599",
    "#7E95A7", "#2F9A82",
    "#E4DCA3", "#C190C6",
    "#99663F", "#FF0080",
    "#EDF7FB", "#FF6961",
    "#C5C6C8", "#FFE180",
    "#d2bead", "#9BD3AE"
]

let eteslide = function(increment) {
    let nextSlide = function() {
        eteSlider.style.backgroundImage = `url(${eteImgDir}/${currentIndex+1}.jpg)`
        eteSlider.classList.add("image-fade")

        setTimeout(() => {
            eteSlider.classList.remove("image-fade")
        }, 1000)
    }

    let updateIndexOutput = function() {
        indexOutput.innerHTML = `${currentIndex+1} / ${maxImages}`  
    }
    
    let updateLineColor = function() {
        colorOutputLine.style.backgroundColor = colorList[Math.floor(Math.random() * colorList.length)]
    }

    currentIndex += increment

    if (currentIndex < 0)
        currentIndex = maxImages - 1
    else if (currentIndex > maxImages - 1)
        currentIndex = 0

    nextSlide()
    updateIndexOutput()
    updateLineColor()
}

arrowLeft.addEventListener("click", () => {
    eteslide(-1)
})

arrowRight.addEventListener("click", () => {
    eteslide(1)
})

indexOutput.innerHTML = `1 / ${maxImages}`
