const cart = []
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button.dataset);
  })
})
