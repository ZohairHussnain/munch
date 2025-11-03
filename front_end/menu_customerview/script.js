const starters = document.getElementById("starters")
const mains = document.getElementById("mains")
const desserts = document.getElementById("desserts")

starters.addEventListener("click", ()=>{
    window.location.href = "starters/starters.html"
})

mains.addEventListener("click", ()=>{
    window.location.href = "mains/mains.html"
})

desserts.addEventListener("click", ()=>{
    window.location.href = "desserts/desserts.html"
})