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
            tag: 'lemon',
            price: 10,
            inCart: 0
        },
        {
            name: 'green collar',
            tag: 'cucumba',
            price: 10,
            inCart: 0
        }
    ];

    for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
        })
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.carticon span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) { // if there is a productNumber
        productNumbers = parseInt(productNumbers) // convert string to int
        localStorage.setItem('cartNumbers', productNumbers + 1); // increment by 1 if already has product
        document.querySelector('.carticon span').textContent = productNumbers + 1; // update # next to cart
    } else { // start at 0
        localStorage.setItem('cartNumbers', 0); // set to 1 if no items
        document.querySelector('.carticon span').textContent = 0; // display # next to cart
    }
}


function main(){
    addCart()
    cartNumbers()
    onLoadCartNumbers()
}