
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

//starters/mains/desserts page
const addBtn = document.getElementById("addItemBtn");
const backBtn = document.getElementById("goBackBtn");


const gotoStarters = document.getElementById("goStarters");
const gotoMains = document.getElementById("goMains");
const gotoDesserts = document.getElementById("goDesserts");


const menuContainer = document.getElementById("menuContainer");
const imageInput = document.getElementById("imageInput");
const menuForm = document.getElementById("menuForm");
const menuModal = new bootstrap.Modal(document.getElementById("menuModal"));



if(gotoStarters){
    gotoStarters.addEventListener("click",()=>{
        window.location.href = "../starters/starters.html"
    })
}
if(gotoMains){
    gotoMains.addEventListener("click",()=>{
        window.location.href = "../mains/mains.html"
    })
}
if(gotoDesserts){
    gotoDesserts.addEventListener("click",()=>{
        window.location.href = "../desserts/desserts.html"
    })
}

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "../index.html";
    })
}



if (addBtn) {
  addBtn.addEventListener("click", () => {
    document.getElementById("menuModalLabel").textContent = "Add Menu Item";
    menuForm.reset(); // clear previous inputs
    menuModal.show();
  });
}
//handle the bootsrap modal
menuForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();
  //img
  const file = document.getElementById("itemImage").files[0];

  if (!name || !price || !file) return alert("Please fill all fields.");

  //handle img input
  const imageURL = URL.createObjectURL(file);
//html of bootsrap card
//rating is static for now, will make it change when backend connects
//wait time as well ^
  const cardHTML = `
    <div class="col-lg-3 col-md-4 col-sm-12 theCard">
      <div class="card mb-3" style="width: 18rem;">
        <img src="${imageURL}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${price} AED</p>
          <div class="rating text-center">
          ⭐ ⭐ ⭐ ⭐ ☆ <span class="rating-value">(4.2 / 5)</span>
          </div>
          <div class="wait-time text-center mb-1">
           ⏱ Avg Wait: 12 min
          </div>
          <a href="#" class="btn btn-primary d-block mx-auto mb-1 edit-btn">Edit</a>
          <a href="#" class="btn btn-danger d-block mx-auto delete-btn">Delete</a>
        </div>
      </div>
    </div>
  `;
//insert node
  menuContainer.insertAdjacentHTML("beforeend", cardHTML);
  menuModal.hide(); // close modal
});


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


