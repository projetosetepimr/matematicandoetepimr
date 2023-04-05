let imageOutput = document.getElementById("image-output")
let slideIndices = document.querySelectorAll("div.index")
let baseDir = "/static/img/main-slider/desktop/"
let currentIndex = 0
let maxIndex = 29 // maxIndex = 30

let defaultIndexColor = "#858484"
let activatedIndexColor = "#b7b7b7"

// console.log(image_output, slide_indices)

function slide() {
    imageOutput.style.backgroundImage = `url('${baseDir}${currentIndex+1}.jpg')`
    slideIndices[currentIndex].style.backgroundColor = activatedIndexColor
    //console.log(currentIndex)

    if (currentIndex > 0) {
        slideIndices[currentIndex-1].style.backgroundColor = defaultIndexColor
    } else {
        slideIndices[maxIndex].style.backgroundColor = defaultIndexColor
    }

    if (currentIndex < maxIndex) {
        currentIndex++
    } else {
        currentIndex = 0 
    }
}

slideIndices[0].style.backgroundColor = activatedIndexColor
setInterval(slide, 3000)

