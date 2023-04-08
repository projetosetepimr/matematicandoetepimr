const slider = document.getElementById("image-output")
const slideList = document.getElementById("slide-wrap")
const indicesList = document.querySelectorAll("div.index")
const baseDir = "/static/img/main-slider"
const breakpointWidth = 1100
const maxCount = 32

let sliderWidth = slider.offsetWidth
let count = 1

function setup() {
    if (window.innerWidth > breakpointWidth)
        var finalDir = `${baseDir}/desktop`
    else
        var finalDir = `${baseDir}/mobile`

    Array.prototype.slice.call(
        document.querySelectorAll('ul#slide-wrap > li')).forEach(
        function(item) {
            item.remove()
    })

    for (let i=0; i<maxCount; i++) {
        let li = document.createElement("li")
        let img = document.createElement("img")
        img.src = `${finalDir}/${i+1}.jpg`
        img.alt = `${i+1} Image`
        img.width = sliderWidth
        li.appendChild(img)
        slideList.appendChild(li)
    }
}

let slide = function() {
    let updateIndex = function() {
        let index = count - 1
        if (index > 0 && index < maxCount) {
            indicesList[index].classList.add("active")
            indicesList[index-1].classList.remove("active")
        } else {
            indicesList[0].classList.add("active")
            try {
                throw indicesList[maxCount-1].classList.remove("active")
            } catch (e) {
                // console.log(e)
            }
        }
    }

    let nextSlide = function() {
        if (count < maxCount) {
            slideList.style.left = "-" + count * sliderWidth + "px"
            count++
        } else if (count == maxCount) {
            slideList.style.left = "0px"
            count = 1
        }
        updateIndex()
    }

    setInterval(nextSlide, 5000)
}

indicesList[0].classList.add("active")
setup()
window.addEventListener("resize", () => {
    sliderWidth = slider.offsetWidth
    setup()
})
window.onload = function() {
    slide()
}
