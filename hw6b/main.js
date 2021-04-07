// from javascript shopping cart tutorial: https://www.youtube.com/watch?v=PoTGs38DR9E

function addCart() {
    let carts = document.querySelectorAll(".add-cart");

    let products = [
        {
            name: 'red collar',
            tag: 'strawberry',
            price: 10,
            inCart: 0
        },
        {
            name: 'purple collar',
            tag: 'blackberry',
            price: 10,
            inCart: 0
        },
        {
            name: 'blue collar',
            tag: 'crazyberry',
            price: 10,
            inCart: 0
        },
        {
            name: 'orange collar',
            tag: 'fireorange',
            price: 10,
            inCart: 0
        },
        {
            name: 'yellow collar',
            tag: 'yellow',
            price: 10,
            inCart: 0
        },
        {
            name: 'green collar',
            tag: 'green',
            price: 10,
            inCart: 0
        }
    ];
    // adds event listener to each item to identify which one is clicked
    for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i])
        })
    }
}
 
// displays number from local storage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.carticon span').textContent = productNumbers;
    }
}

//increments cart number in cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) { // if there is a productNumber
        productNumbers = parseInt(productNumbers) // convert string to int
        localStorage.setItem('cartNumbers', productNumbers + 1); // increment by 1 if already has product
        document.querySelector('.carticon span').textContent = productNumbers + 1; // update # next to cart
    } else { // start at 0
        localStorage.setItem('cartNumbers', 1); // set to 1 if no items
        document.querySelector('.carticon span').textContent = 1; // display # next to cart
    }
    setItems(product);
}

// sets the attributes of items in cart and increments ones in cart of each
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (product != undefined) {
        if (cartItems != null) {
            if(cartItems[product.tag] == undefined) {
                cartItems = { 
                    ...cartItems, // add diff item rather than overriding
                    [product.tag]: product 
                }
            }
            cartItems[product.tag].inCart += 1;
        } else {
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            } 
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    // console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost); // convert from string into number
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems); // convert to javascript from getting in local storage

    // console.log(cartItems); 
    let productContainer = document.querySelector(".products");
    // console.log(productContainer);
    if(cartItems && productContainer) {
        productContainer.innerHTML = ''; // want it to be empty when starting
        Object.values(cartItems).map(item => { // icon from: https://ionicons.com/
            productContainer.innerHTML +=  `

            <div class="product">
                <ion-icon name="close-circle" onclick="deleteItem();"></ion-icon>
                <img src="images/${item.tag}.png">
                <h6>${item.name}</h6>
                <span>$${item.price}.00 &emsp; &emsp; &emsp; &emsp;</span> 
                <span>${item.inCart}</span>
                <span>&emsp; &emsp; &emsp; &emsp; $${item.inCart * item.price}.00</span>
            </div>

            `;
        });

    }
}


// deletes items when you press on 'x'
function deleteItem() {
    localStorage.clear(); //clears your local storage
    location.reload(); //refreshes page
}

// from: https://www.youtube.com/watch?v=iE_6pQ3RlZU
function togglePopup(fruit, description) {
    document.getElementById("pop-up").classList.toggle("active");
    // console.log("toggled");
    document.getElementById("collar-color").innerHTML = (fruit);
    document.getElementById("collar-description").innerHTML = (description);
}

// changes color color based on mousing over that collar
// is svg file of dog exported from figma
function changeCollarColor(hexColor) {
    document.getElementById("chonky-dog").setAttribute("fill", hexColor);
    // console.log("color changed to", hexColor);
}

// changes color for cat collar instead
function changeCatCollar(hexColor) {
    document.getElementById("chonky-cat").setAttribute("fill", hexColor);
}

function main(){
    addCart() // adds to cart
    //cartNumbers() // increments
    onLoadCartNumbers() // gets number 
    displayCart()
}