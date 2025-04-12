// Wait for DOM to load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // ===== Registration Form Validation =====
  const registrationForm = document.getElementById("registrationForm");

  // Only proceed if registration form exists on the page
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission
      let isValid = true; // Flag to track overall form validity

      // Reset all error messages before new validation
      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));

      // Get trimmed field values
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const postal = document.getElementById("postal").value.trim();
      const email = document.getElementById("email").value.trim();

      // Validation patterns
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // (123) 456-7890
      const postalRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; // A1A 1A1
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email format

      // Field validations (check presence and format)
      if (!firstName)
        showError("firstNameError", "First name is required"),
          (isValid = false);
      if (!lastName)
        showError("lastNameError", "Last name is required"), (isValid = false);
      if (!phone)
        showError("phoneError", "Phone number is required"), (isValid = false);
      else if (!phoneRegex.test(phone))
        showError("phoneError", "Format: (123) 456-7890"), (isValid = false);
      if (!postal)
        showError("postalError", "Postal code is required"), (isValid = false);
      else if (!postalRegex.test(postal))
        showError("postalError", "Format: A1A 1A1"), (isValid = false);
      if (!email)
        showError("emailError", "Email is required"), (isValid = false);
      else if (!emailRegex.test(email))
        showError("emailError", "Invalid email format"), (isValid = false);

      // If all validations pass, show success message
      if (isValid) {
        alert("Registration successful!");
        // For this assignment, we won't submit to a server
      }
    });

    // Phone Mask - formats input as (123) 456-7890
    const phoneInput = document.getElementById("phone");
    phoneInput?.addEventListener("input", function (e) {
      const x = e.target.value
        .replace(/\D/g, "") // Remove non-digits
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : `(${x[1]}) ${x[2]}${x[3] ? "-" + x[3] : ""}`;
    });

    // Postal Code Mask - formats input as A1A 1A1
    const postalInput = document.getElementById("postal");
    postalInput?.addEventListener("input", function (e) {
      let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Allow only alphanumeric
      if (value.length > 3) value = value.slice(0, 3) + " " + value.slice(3); // Add space after 3 chars
      e.target.value = value.slice(0, 7); // Limit to Canadian postal code length
    });
  }

  // ===== Login Validation =====
  window.login = function () {
    // Get trimmed credentials
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Basic presence check
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Hardcoded credentials for demo purposes
    if (email === "alice@me.com" && password === "Rose!") {
      alert("Login successful! Redirecting to flower list...");
      window.location.href = "../listcart/list.html";
    } else {
      alert("Invalid email or password");
    }
  };

  // ===== Forgot Password Function =====
  window.forgotPassword = function () {
    // Get email from login form or prompt if not available
    const email =
      document.getElementById("loginEmail")?.value.trim() ||
      prompt("Please enter your email:");
    if (email) {
      alert(`Password reset instructions have been sent to ${email}`);
    }
  };
});

// Helper function to display validation errors
function showError(id, message) {
  const errorElement = document.getElementById(id);
  if (errorElement) errorElement.textContent = message; // Only set if element exists
}
