// Sample Flower Data
const flowers = [
  { name: "Rose", price: 10.0, description: "Classic red rose" },
  { name: "Tulip", price: 8.5, description: "Bright spring tulips" },
  { name: "Daisy", price: 7.0, description: "Cheerful white daisies" },
  { name: "Sunflower", price: 9.0, description: "Large vibrant sunflowers" },
  { name: "Lily", price: 12.0, description: "Elegant white lilies" },
];

// Cart Object to hold selected items
const cart = {};

// Initialize page elements on load
window.onload = function () {
  // Display flower list only if the container exists
  if (document.getElementById("flower-list")) displayFlowerList();
  // Update cart display if cart section is present
  if (document.getElementById("cart-items")) updateCartDisplay();
};

// Display the list of flowers on the page
function displayFlowerList() {
  const flowerList = document.getElementById("flower-list");
  flowerList.innerHTML = "";

  flowers.forEach((flower) => {
    const flowerCard = document.createElement("div");
    flowerCard.className = "flower-item";

    // Create flower card HTML
    flowerCard.innerHTML = `
      <h3>${flower.name}</h3>
      <p>${flower.description}</p>
      <p><strong>$${flower.price.toFixed(2)}</strong></p>
      <button onclick="addToCart('${flower.name}', ${
      flower.price
    })" aria-label="Add ${flower.name} to cart">Add to Cart</button>
    `;

    // Append flower card to the list
    flowerList.appendChild(flowerCard);
  });
}

// Add selected flower to cart
function addToCart(name, price) {
  // If flower already in cart, increment quantity
  if (cart[name]) {
    cart[name].quantity++;
  } else {
    // Otherwise, add new flower with quantity 1
    cart[name] = { price, quantity: 1 };
  }

  // Update the cart display
  updateCartDisplay();

  // Provide user feedback by disabling and changing button text briefly
  const buttons = document.querySelectorAll(
    `button[onclick*="addToCart('${name}'"]`
  );
  buttons.forEach((btn) => {
    btn.textContent = "Added!";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 1000);
  });
}

// Remove one quantity of the flower from cart
function removeFromCart(name) {
  if (cart[name]) {
    cart[name].quantity--;
    // Remove flower from cart if quantity reaches 0
    if (cart[name].quantity <= 0) delete cart[name];
    updateCartDisplay();
  }
}

// Refresh the cart table with current cart contents
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  cartItems.innerHTML = ""; // Clear previous contents
  let subtotal = 0;

  // Loop through cart items and display them
  for (let name in cart) {
    const item = cart[name];
    subtotal += item.price * item.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td><button onclick="removeFromCart('${name}')">Remove</button></td>
    `;
    cartItems.appendChild(row);
  }

  // Calculate tax (10%) and total
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Update totals in the DOM
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

// Handle checkout process
function checkout() {
  // Prevent checkout if cart is empty
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Confirm purchase and clear cart
  alert("Thank you for your purchase!");
  Object.keys(cart).forEach((key) => delete cart[key]);
  updateCartDisplay();
}
