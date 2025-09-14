export const cart = [
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

