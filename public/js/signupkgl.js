document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', function (event) {
    let valid = true;

    // Username Validation (non-empty)
    const username = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    if (username.value.trim() === '') {
      usernameError.textContent = 'Username is required.';
      valid = false;
    } else {
      usernameError.textContent = '';
    }

    // Email Validation (valid email format)
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '' || !emailPattern.test(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Password Validation (at least 6 characters)
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    if (password.value.trim() === '' || password.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters long.';
      valid = false;
    } else {
      passwordError.textContent = '';
    }

    // Confirm Password Validation (must match password)
    const confirmPassword = document.getElementById('corfirmpassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPassword.value.trim() === '' || confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = 'Passwords do not match.';
      valid = false;
    } else {
      confirmPasswordError.textContent = '';
    }

    // Role Validation (must be selected)
    const role = document.getElementById('role');
    const roleError = document.getElementById('roleError');
    if (role.value === '') {
      roleError.textContent = 'Please select a role.';
      valid = false;
    } else {
      roleError.textContent = '';
    }

    // Branch Validation (must be selected)
    const branch = document.getElementById('branch');
    const branchError = document.getElementById('branchError');
    if (branch.value === '') {
      branchError.textContent = 'Please select a branch.';
      valid = false;
    } else {
      branchError.textContent = '';
    }

    if (!valid) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });
});
