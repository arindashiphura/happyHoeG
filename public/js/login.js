document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailerror');
    const passwordError = document.getElementById('passworderror');
    
    loginForm.addEventListener('submit', function (event) {
      let valid = true;
      
      // Email Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      } else {
        emailError.textContent = '';
      }
      
      // Password Validation
      if (passwordInput.value.trim().length < 6) { // Minimum length for password
        passwordError.textContent = 'Password must be at least 6 characters long.';
        valid = false;
      } else {
        passwordError.textContent = '';
      }
      
      if (!valid) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });