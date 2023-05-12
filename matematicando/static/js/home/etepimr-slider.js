const eteSlider = document.querySelector("div#ete-slider")
const indexOutput = document.getElementById("index-output")
const eteImgDir = "/static/img/home/etepimr-slider"
const maxImages = 32
let currentIndex = 0

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

    currentIndex += increment

    if (currentIndex < 0)
        currentIndex = maxImages - 1
    else if (currentIndex > maxImages - 1)
        currentIndex = 0

    nextSlide()
    updateIndexOutput()
}

const arrowLeftMobile = document.querySelector("div.mobile-arrow#arrow-left")
const arrowRightMobile = document.querySelector("div.mobile-arrow#arrow-right")
const arrowLeftDesktop = document.querySelector("div.desktop-arrow#arrow-left")
const arrowRightDesktop = document.querySelector("div.desktop-arrow#arrow-right")

arrowLeftMobile.addEventListener("click", () => {
    eteslide(-1)
})
arrowRightMobile.addEventListener("click", () => {
    eteslide(1)
})

arrowLeftDesktop.addEventListener("click", () => {
    eteslide(-1)
})
arrowRightDesktop.addEventListener("click", () => {
    eteslide(1)
})

indexOutput.innerHTML = `1 / ${maxImages}`
