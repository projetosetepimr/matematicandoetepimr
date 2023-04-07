let slider = document.getElementById("image-output")
let slideList = document.getElementById("slide-wrap")
let indicesList = document.querySelectorAll("div.index")
let baseDir = "/static/img/main-slider"
let sliderWidth = slider.offsetWidth
let specificDir = ""
let imageMax = 32
let images = []
let count = 1


function setup() {
    if (window.innerWidth > 1100)
        specificDir = `${baseDir}/desktop`
    else
        specificDir = `${baseDir}/mobile`

    Array.prototype.slice.call(document.querySelectorAll('ul#slide-wrap > li')).forEach(
        function(item) {
            item.remove()
    })

    for (let i=0; i<imageMax; i++) {
        let li = document.createElement("li")
        let img = document.createElement("img")
        img.src = `${specificDir}/${i+1}.jpg`
        img.alt = `${i+1} Image`
        img.width = sliderWidth
        images[i] = img
        li.appendChild(img)
        slideList.appendChild(li)
    }
}

let slide = function() {
    let updateIndex = function() {
        let index = count-1
        if (index > 0 && index < imageMax) {
            indicesList[index].classList.add("active")
            indicesList[index-1].classList.remove("active")
        } else {
            indicesList[0].classList.add("active")
            try {
                throw indicesList[imageMax-1].classList.remove("active")
            } catch (e) {
                // console.log(e)
            }
        }
    }

    let nextSlide = function() {
        if (count < imageMax) {
            slideList.style.left = "-" + count * sliderWidth + "px"
            count++
        } else if (count == imageMax) {
            slideList.style.left = "0px"
            count = 1
        }
        updateIndex(count)
    }

    setInterval(nextSlide, 5000)
}

indicesList[0].classList.add("active")
setup()
window.addEventListener("resize", function() {
    sliderWidth = slider.offsetWidth
    setup()
})
window.onload = function() {
    slide()
}
