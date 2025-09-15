export let cart = [{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
},
{
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 1,
},
{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1,

},
];
export function addToCart(productId) {

  let found = false;
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity += 1;
      found = true;
    }
  })

  if (!found) {
    cart.push({
      productId: productId,
      quantity: 1
    })
  }
  console.log(cart)
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
export function removeFromCart(productId) {
  let toDelete = document.querySelector(".container-" + productId)
  toDelete.remove()
  cart = cart.filter(item => item.productId != productId)
}


