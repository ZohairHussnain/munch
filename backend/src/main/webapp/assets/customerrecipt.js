    //print total so far and items(receipt)
    document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    //if cart empty show a message
    if (Object.keys(cart).length === 0) {
    document.getElementById("receiptItems").innerHTML = "<p>Your cart is empty.</p>";
    return;
}

    //convert cart json keys to csv format
    const ids = Object.keys(cart).join(",");


    fetch(`/backend_war_exploded/customer/getitems?ids=${ids}`)
    .then(res => res.json())
    .then(items => renderReceipt(items, cart));
});

    function renderReceipt(items, cart) {
    const container = document.getElementById("receiptItems");
    let total = 0;

    items.forEach(item => {
    const qty = cart[item.id];
    const subtotal = qty * item.price;
    total += subtotal;

    container.insertAdjacentHTML("beforeend", `
            <div class="item">
                <img src="/backend_war_exploded/uploads/${item.image}" alt="">
                <span>${qty} x ${item.name}</span>
                <span class="price">AED ${subtotal}</span>
            </div>
        `);
});

    document.getElementById("totalPrice").textContent = "AED " + total;
}


//pay - yet to implement
    document.querySelector(".pay").addEventListener("click", () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || {};

        if (Object.keys(cart).length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const totalText = document.getElementById("totalPrice").textContent;
        const total = Number(totalText.replace("AED", "").trim());

        fetch("/backend_war_exploded/customer/pay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                total: total,
                cart: cart
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    // order created successfully
                    localStorage.removeItem("cart");
                    window.location.href = "thankyou.html?orderId=" + result.orderId;
                } else {
                    alert("Payment failed.");
                }
            })
            .catch(err => console.error("PAY ERROR:", err));
    });