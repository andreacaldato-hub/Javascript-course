export let cart = JSON.parse(localStorage.getItem('cart'))
if (!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  }]

}
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}
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
  saveToStorage()
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  saveToStorage()
}
export function removeFromCart(productId) {
  let toDelete = document.querySelector(".container-" + productId)
  toDelete.remove()
  cart = cart.filter(item => item.productId != productId)
  saveToStorage()
}


