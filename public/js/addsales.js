document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('salesForm').addEventListener('submit', function (event) {
    let valid = true;

    // Produce Name Validation
    const produceName = document.getElementById('producename');
    const produceNameError = document.getElementById('produceNameError');
    if (produceName.value === '') {
      produceNameError.textContent = 'Please select a produce.';
      valid = false;
    } else {
      produceNameError.textContent = '';
    }

    // Produce Type Validation
    const produceType = document.getElementById('produceType');
    const produceTypeError = document.getElementById('produceTypeError');
    if (produceType.value.length < 2) {
      produceTypeError.textContent = 'Produce type must be at least 2 characters long.';
      valid = false;
    } else {
      produceTypeError.textContent = '';
    }

    // Tonnage Validation
    const tonnage = document.getElementById('tonnage');
    const tonnageError = document.getElementById('tonnageError');
    if (tonnage.value === '' || tonnage.value.length < 3 || isNaN(tonnage.value)) {
      tonnageError.textContent = 'Tonnage must be a number and at least 3 characters long.';
      valid = false;
    } else {
      tonnageError.textContent = '';
    }

    // Amount Paid Validation
    const amountPaid = document.getElementById('amountPaid');
    const amountPaidError = document.getElementById('amountPaidError');
    if (amountPaid.value === '' || amountPaid.value.length < 5 || isNaN(amountPaid.value)) {
      amountPaidError.textContent = 'Amount paid must be a number and at least 5 characters long.';
      valid = false;
    } else {
      amountPaidError.textContent = '';
    }

    // Buyer’s Name Validation
    const buyerName = document.getElementById('buyerName');
    const buyerNameError = document.getElementById('buyerNameError');
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(buyerName.value)) {
      buyerNameError.textContent = 'Buyer\'s name must be alphanumeric and at least 2 characters long.';
      valid = false;
    } else {
      buyerNameError.textContent = '';
    }

    // Sales Agent’s Name Validation
    const salesAgentName = document.getElementById('salesAgentName');
    const salesAgentNameError = document.getElementById('salesAgentNameError');
    if (salesAgentName.value === '') {
      salesAgentNameError.textContent = 'Please select a sales agent.';
      valid = false;
    } else {
      salesAgentNameError.textContent = '';
    }

    // Date and Time Validation
    const dateTime = document.getElementById('dateTime');
    const dateTimeError = document.getElementById('dateTimeError');
    if (dateTime.value === '') {
      dateTimeError.textContent = 'Please select date and time.';
      valid = false;
    } else {
      dateTimeError.textContent = '';
    }

    // Branch Name Validation
    const branch = document.getElementById('branch');
    const branchError = document.getElementById('branchError');
    if (branch.value === '') {
      branchError.textContent = 'Please select a branch.';
      valid = false;
    } else {
      branchError.textContent = '';
    }

    if (!valid) {
      event.preventDefault(); // Stop form submission if validation fails
    }
  });
});
