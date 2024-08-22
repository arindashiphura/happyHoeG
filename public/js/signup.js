document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form elements
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;
    const errorMessage = document.getElementById('error-message');

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Password validation
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Terms and Conditions validation
    if (!terms) {
        errorMessage.textContent = "You must agree to the terms and conditions.";
        return;
    }

    // If all validations pass
    errorMessage.textContent = "";
    alert("Signup successful!");

    // You can now submit the form, for example using an AJAX call or form submission
    // this.submit();  // Uncomment to submit the form
});
