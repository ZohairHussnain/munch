
//manage menu/index page
const starters = document.getElementById("starters");
const mains = document.getElementById("mains");
const desserts = document.getElementById("desserts");

if (starters) {
    starters.addEventListener("click", () => {
        window.location.href = "./starters.html";
    })
}

if (mains) {
    mains.addEventListener("click", () => {
        window.location.href = "./mains.html";
    })

    desserts.addEventListener("click", () => {
        window.location.href = "./desserts.html";
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
        window.location.href = "./starters.html"
    })
}
if(gotoMains){
    gotoMains.addEventListener("click",()=>{
        window.location.href = "./mains.html"
    })
}
if(gotoDesserts){
    gotoDesserts.addEventListener("click",()=>{
        window.location.href = "./desserts.html"
    })
}

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "./managermenu.html";
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
menuForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = itemNameInput.value.trim();
    const price = itemPriceInput.value.trim();
    const file = itemImageInput.files[0];

    if (!name || !price || !file) {
        alert("All fields required");
        return;
    }

    let category = 0;
    if (window.location.pathname.includes("starters")) category = 1;
    if (window.location.pathname.includes("mains")) category = 2;
    if (window.location.pathname.includes("desserts")) category = 3;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", file);

    let stringcat =
        category === 1 ? "starters" :
            category === 2 ? "mains" :
                category === 3 ? "desserts" :
                    "";

    let url = "/backend_war_exploded/manager/addmenu";//default
    if (editingCard) {
        const itemId = editingCard.querySelector(".edit-btn").dataset.id;
        formData.append("id", itemId);
        url = "/backend_war_exploded/manager/editmenu";
    }
    fetch(url, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            console.log("Server result:", result);

            if (result.status === "success") {
                menuModal.hide();
                menuForm.reset();


                loadMenuItems(stringcat);
            } else {
                alert("Failed to add item");
            }
        })
        .catch(err => {
            console.error("Add item failed:", err);
            alert("Server error");
        });
});

//delete
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




    if(e.target.classList.contains("edit-btn")){
        const card = e.target.closest(".theCard");
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

document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    if (path.includes("starters.html")) {
        loadMenuItems("starters");
    }
    else if (path.includes("mains.html")) {
        loadMenuItems("mains");
    }
    else if (path.includes("desserts.html")) {
        loadMenuItems("desserts");
    }

});

function loadMenuItems(category) {
    console.log("loadmenuitems()");
    fetch("/backend_war_exploded/manager/loadmenu?category=" + category)
        .then(res => res.json())
        .then(items => {
            renderMenuCards(items);
        })
        .catch(err => console.error("Error loading items:", err));
}

function renderMenuCards(items) {
    console.log("renderMenuCards()");
    menuContainer.innerHTML = ""; // clear previous

    items.forEach(item => {
        const cardHTML = `
        <div class="col-lg-3 col-md-4 col-sm-12 mr-3 theCard">
          <div class="card mb-3" style="width: 18rem;">
            <img src="/backend_war_exploded/uploads/${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.price} AED</p>

              <div class="rating text-center">
                ⭐ ⭐ ⭐ ⭐ ☆ <span class="rating-value">(4.2 / 5)</span>
              </div>
              <div class="wait-time text-center mb-1">
                ⏱ Avg Wait: 12 min
              </div>

              <a href="#" class="btn btn-primary d-block mx-auto mb-1 edit-btn" data-id="${item.id}">Edit</a>
              <a href="#" class="btn btn-danger d-block mx-auto delete-btn" data-id="${item.id}">Delete</a>
            </div>
          </div>
        </div>
        `;

        menuContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}
