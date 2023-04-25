const menu = document.querySelector("div#divmenu > i#menu")
const navlist = document.getElementById("navlist")
const links = document.querySelectorAll("ul#navlist > li")

const icons = ["ri-menu-line", "ri-close-line"]
let isActive = false

menu.addEventListener("click", () => {
    links.forEach((link, index) => {
        link.style.animation
         ? (link.style.animation = "")
         : (link.style.animation = 
            `linkFade .8s ease forwards ${index/20+0.3}s`)
    })

    navlist.classList.toggle("active")

    if (isActive) {
        menu.classList.remove(icons[1])
        menu.classList.add(icons[0])
    } else {
        menu.classList.remove(icons[0])
        menu.classList.add(icons[1])
    }

    isActive = isActive ? false : true
})
