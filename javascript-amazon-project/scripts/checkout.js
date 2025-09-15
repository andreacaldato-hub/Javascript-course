import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { formatCurrency } from "./utils/money.js";
import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/deliveryOption.js"
function renderOrderSummary() {

  let container = document.querySelector(".js-order-summary")
  let html = ""
  let matchingProduct;
  cart.forEach(item => {
    products.forEach(product => {
      if (item.productId === product.id) {
        matchingProduct = product


      }

    })
    let deliveryOptionId = item.deliveryOptionId
    let delivery;
    deliveryOption.forEach(option => {
      if (deliveryOptionId === option.id) {
        delivery = option

      }
    })
    const today = dayjs()
    const deliveyDate = today.add(delivery.deliveryDays, 'days')
    const date = deliveyDate.format("dddd, MMMM D")

    html += `
  <div class="cart-item-container container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${date}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct, item)}
          </div>

        </div>
    </div>
  </div>`

  });
  function deliveryOptionsHTML(matchingProduct, item) {
    let html = ""
    deliveryOption.forEach(option => {
      const today = dayjs()
      const deliveryDate = today.add(option.deliveryDays, 'days')
      const dateString = deliveryDate.format('dddd, MMMM D')
      const priceString = option.priceCents === 0 ? "Free" : formatCurrency(option.priceCents)
      const isChecked = option.id === item.deliveryOptionId
      html += `
          <div data-delivery-option-id="${option.id}" data-product-id="${matchingProduct.id}" class="delivery-option js-delivery-option">
            <input ${isChecked ? 'checked' : ''} type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  $${priceString} - Shipping
                </div>
              </div>
          </div>`




    })
    return html

  }
  container.innerHTML = html
  document.querySelectorAll(".delete-quantity-link").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId
      removeFromCart(productId)
    })
  })
  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, deliveryOptionId } = button.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary()

    })

  })
}
renderOrderSummary()
