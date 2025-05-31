document.addEventListener("DOMContentLoaded", function () {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayCartItems(products, cart);
        });
});

function displayCartItems(products, cart) {
    let listCartHTML = document.querySelector('.list');
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        let product = products.find(p => p.id == item.product_id);
        if (product) {
            totalQuantity += item.quantity;
            totalPrice += product.price * item.quantity;

            let cartItem = `
                <div class="item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="returnPrice">$${(product.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
            listCartHTML.innerHTML += cartItem;
        }
    });

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = `$${totalPrice.toFixed(2)}`;
}
