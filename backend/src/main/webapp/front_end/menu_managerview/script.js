
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
const menuForm = document.getElementById("menuForm");
const menuModalElement = document.getElementById("menuModal");
const menuModalLabel = document.getElementById("menuModalLabel");
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const itemImageInput = document.getElementById("itemImage");
const menuModal = menuModalElement ? new bootstrap.Modal(menuModalElement) : null;
let editingCard = null;



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



if (addBtn && menuForm && menuModal) {
  addBtn.addEventListener("click", () => {
    if (menuModalLabel) menuModalLabel.textContent = "Add Menu Item";
    menuForm.reset(); // clear previous inputs
    editingCard = null;
    if (itemImageInput) itemImageInput.required = true;
    menuModal.show();
  });
}

if (menuForm && menuModal) {
  menuForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = itemNameInput ? itemNameInput.value.trim() : "";
    const price = itemPriceInput ? itemPriceInput.value.trim() : "";
    const file = itemImageInput ? itemImageInput.files[0] : null;

    if (!name || !price) return alert("Please fill all fields.");
    if (!editingCard && !file) return alert("Please upload an image for new items.");

    if (editingCard) {
      const titleEl = editingCard.querySelector(".card-title");
      const priceEl = editingCard.querySelector(".card-text");
      const imageEl = editingCard.querySelector("img");
      if (titleEl) titleEl.textContent = name;
      if (priceEl) priceEl.textContent = `${price} AED`;
      if (imageEl) {
        if (file) {
          imageEl.src = URL.createObjectURL(file);
        }
        imageEl.alt = name;
      }
    } else {
      const imageURL = URL.createObjectURL(file);
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
      if (menuContainer) {
        menuContainer.insertAdjacentHTML("beforeend", cardHTML);
      }
    }
    menuModal.hide();
    menuForm.reset();
    editingCard = null;
    if (itemImageInput) itemImageInput.required = true;
  });
}


if (menuContainer) {
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
        const card = e.target.closest(".card");
        if (!card || !menuModal || !menuForm || !itemNameInput || !itemPriceInput) return;
        editingCard = card;
        const oldName = card.querySelector(".card-title");
        const oldPrice = card.querySelector(".card-text");
        if (itemNameInput && oldName) itemNameInput.value = oldName.textContent.trim();
        if (itemPriceInput && oldPrice) {
            const cleanedPrice = oldPrice.textContent.replace(/[^\d.]/g, "");
            itemPriceInput.value = cleanedPrice;
        }
        if (itemImageInput) {
            itemImageInput.value = "";
            itemImageInput.required = false;
        }
        if (menuModalLabel) menuModalLabel.textContent = "Edit Menu Item";
        menuModal.show();
    }


})
}

//

