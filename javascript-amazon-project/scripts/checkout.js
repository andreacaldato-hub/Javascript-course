import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { formatCurrency } from "./utils/money.js";
import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/deliveryOption.js"
function renderOrderSummary() {
  updateCheckoutHeader(cart)

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
    const deliveryDate = today.add(delivery.deliveryDays, 'days')
    const date = deliveryDate.format("dddd, MMMM D")

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
  container.innerHTML = updateOrderSummary(cart) + html
  document.querySelectorAll(".delete-quantity-link").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId
      removeFromCart(productId)
      renderOrderSummary()
      updateCheckoutHeader(cart)
    })
  })
  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, deliveryOptionId } = button.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary()
      updateCheckoutHeader(cart)


    })

  })
  function updateOrderSummary(cart) {
    let quantity = 0
    let price = 0
    let shipping = 0
    let total = 0
    let tax = 0
    let orderTotal = 0
    cart.forEach(item => {
      products.forEach(product => {
        if (item.productId === product.id) {
          quantity += item.quantity
          price += product.priceCents * item.quantity

        }

      })
      deliveryOption.forEach(option => {
        if (item.deliveryOptionId === option.id) {
          shipping += option.priceCents
        }
      })
    })
    total = price + shipping
    tax = total * 0.1
    orderTotal = total + tax
    let html = `

        <div class="payment-summary js-payment-summary">
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${quantity}):</div>
          <div class="payment-summary-money">$${(price / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(shipping / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(orderTotal / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
      </div>
      </div>`
    return html
  }
  function updateCheckoutHeader(cart) {

    let quantity = 0
    cart.forEach(item => {
      products.forEach(product => {
        if (item.productId === product.id) {
          quantity += item.quantity

        }

      })
    })
    const header = document.querySelector(".checkout-header")
    let html = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link" href="amazon.html">${quantity} items</a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>`
    header.innerHTML = html
  }
}
renderOrderSummary()
