


function validateForm() {
    // Get form fields
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Get error message elements
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Reset error messages
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    let isValid = true;

    // Validate Username (Should not be empty)
    if (username.value.trim() === '') {
        usernameError.textContent = 'Username is required.';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    // Validate Email (Standard email format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validate Password (Minimum 8 characters, at least one letter and one number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password.value.trim())) {
        passwordError.textContent = 'Password must be at least 8 characters long and contain at least one letter and one number.';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Return false to prevent form submission if validation fails
    return isValid;
}






const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', () => {
  // Redirect to login page
  window.location.replace('loginkgl.pug');
});




