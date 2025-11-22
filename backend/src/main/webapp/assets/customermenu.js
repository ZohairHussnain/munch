let cart = JSON.parse(localStorage.getItem("cart")) || {};
//json obj which we retrieve from the storage of the browser
// { itemId: quantity }
//used for updateCart()

document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('click', () => {
    const list = card.nextElementSibling;

    // Change only this card's list (don't hide others)
    if (list.style.display === 'block') {
      list.style.display = 'none';
    } else {
      list.style.display = 'block';
    }
  });
});


document.addEventListener("DOMContentLoaded", ()=>{
    loadCategory("starters", "startersList");
    loadCategory("mains", "mainsList");
    loadCategory("desserts", "dessertsList");
});

function loadCategory(category, listid){
    fetch(`/backend_war_exploded/customer/loadmenu?category=${category}`)
        .then(response => response.json())
        .then(items => {
            renderItems(items, listid);
        })
        .catch(err => console.error(err));
}

function renderItems(items, listid){
    const list = document.getElementById(listid);
    list.innerHTML = "<ul></ul>";
    const ul = list.querySelector("ul");

    items.forEach(item => {
        const li = document.createElement("li");
        li.dataset.id = item.id;
        //we save the count incase user refreshes the page
        const savedCount = cart[item.id] || 0;
        li.innerHTML = `
            <span>${item.name} — AED ${item.price}</span>
            <div class="item-counter d-flex align-items-center">
                <button class="btn-minus">-</button>
                <span class="item-count">${savedCount}</span>
                <button class="btn-plus">+</button>
            </div>
        `;
        ul.appendChild(li);
    })
    //counter
    CounterLogic();
}

function CounterLogic(){
    const counters = document.querySelectorAll(".item-counter");

    counters.forEach(counter => {
        const minusBtn = counter.querySelector(".btn-minus");
        const plusBtn = counter.querySelector(".btn-plus");
        const countDisplay = counter.querySelector(".item-count");

        // get initial count from local storage
        let count = parseInt(countDisplay.textContent);

        plusBtn.addEventListener("click", () => {
            count++;
            countDisplay.textContent = count;
            updateCart(counter.closest("li"), count);
        });

        minusBtn.addEventListener("click", () => {
            if (count > 0) count--;
            countDisplay.textContent = count;
            updateCart(counter.closest("li"), count);
        });
    });
}



function updateCart(li, count) {
    const id = li.dataset.id; // get id, used for db retrival

    if (!id) return;

    if (count === 0) {
        delete cart[id];      // remove from cart
    } else {
        cart[id] = count;     // add/update
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    //store the current cart in the browser storage, by the name "cart"
    //we can only store strings so we gotta stringfy it

    //for testing
    console.log("Updated cart:", cart);
}