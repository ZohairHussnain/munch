
//manage menu/index page
const starters = document.getElementById("starters");
const mains = document.getElementById("mains");
const desserts = document.getElementById("desserts");

if (starters) {
    starters.addEventListener("click", () => {
        window.location.href = "./starters/starters.html";
    })
}

if (mains) {
    mains.addEventListener("click", () => {
        window.location.href = "./mains/mains.html";
    })

    desserts.addEventListener("click", () => {
        window.location.href = "./desserts/desserts.html";
    })
}
//

//starters page
const addBtn = document.getElementById("addItemBtn");
const backBtn = document.getElementById("goBackBtn");
const menuContainer = document.getElementById("menuContainer");
const imageInput = document.getElementById("imageInput");


if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "../index.html";
    })
}

if (addBtn) {
    addBtn.addEventListener("click", () => {
        const name = prompt("Enter item name:")
        if (!name) return;

        const price = prompt("Enter price:");
        if (!name) return;

        

        //to handel image inputs
        const imageURL = "../test_food.webp"
            

            

        const cardHTML =
                `<div class="col-lg-3 col-md-4 col-sm-12 theCard">
        <div class="card mb-3" style="width: 18rem;">
        <img src="${imageURL}" class="card-img-top" alt="../test_food.webp">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${price} AED</p>
          <a href="#" class="btn btn-primary d-block mx-auto mb-1 edit-btn">Edit</a>
          <a href="#" class="btn btn-danger d-block mx-auto delete-btn">Delete</a>
        </div>
        </div>
        </div>`;
            //so we can directly insert the element using the pure html
            menuContainer.insertAdjacentHTML("beforeend", cardHTML);
           
            
        
    })
}



menuContainer.addEventListener("click", (e) => {
    //for deleting menu item
    //we check for any clicks in the container then check if the click came from a delete
    if (e.target.classList.contains("delete-btn")) {
        //ask user to confirm
        if (confirm("Delete this menu item?")) {
            //here we use the bubbling up property, so it looks for the closest card to the delete btn to be deleted
            e.target.closest(".theCard").remove();
        }
    }



    //for editing item

    if(e.target.classList.contains("edit-btn")){
        //get the specific card that clicked edit
        const card = e.target.closest(".card");
        const oldName = card.querySelector(".card-title");
        const oldPrice = card.querySelector(".card-text");
        

        const newName = prompt("Enter new name:");
        if(newName) oldName.textContent = newName;

        const newPrice = prompt("Enter new price:");
        if(newPrice) oldPrice.textContent = newPrice;

        
    }


})

//


