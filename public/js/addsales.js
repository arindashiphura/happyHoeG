document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('editSale').addEventListener('submit', function (event) {
    let valid = true;

    // Produce Name Validation
    const produceName = document.getElementById('producename');
    const produceNameError = document.getElementById('produceNameError');
    if (produceName.value === '') {
      produceNameError.textContent = 'Please select a produce.';
      produceNameError.style = "color:red";
      valid = false;
    } else {
      produceNameError.textContent = '';
    }

    // Produce Type Validation
    const produceType = document.getElementById('produceType');
    const produceTypeError = document.getElementById('produceTypeError');
    if (produceType.value.length < 2) {
      produceTypeError.textContent = 'Produce type must be at least 2 characters long.';
      produceTypeError.style = "color:red";
      valid = false;
    } else {
      produceTypeError.textContent = '';
    }

    // Tonnage Validation
    const tonnage = document.getElementById('tonnage');
    const tonnageError = document.getElementById('tonnageError');
    if (tonnage.value === '' || isNaN(tonnage.value) || tonnage.value <= 0) {
      tonnageError.textContent = 'Tonnage must be a valid number greater than 0.'; 
      tonnageError.style = "color:red";
      valid = false;
    } else {
      tonnageError.textContent = '';
    }

   
    // Amount Paid Validation
    const amountPaid = document.getElementById('amountPaid');
    const amountPaidError = document.getElementById('amountPaidError');
    if (amountPaid.value === '' || isNaN(amountPaid.value) || amountPaid.value <= 0) {
      amountPaidError.textContent = 'Amount paid must be a valid number.';
      amountPaidError.style = "color:red";
      valid = false;
    } else {
      amountPaidError.textContent = '';
    }

    // Buyer’s Name Validation
    const buyerName = document.getElementById('buyerName');
    const buyerNameError = document.getElementById('buyerNameError');
    if (!/^[a-zA-Z0-9 ]{2,}$/.test(buyerName.value)) {
      buyerNameError.textContent = 'Buyer\'s name must be alphanumeric and at least 2 characters long.';
      buyerNameError.style = "color:red";
      valid = false;
    } else {
      buyerNameError.textContent = '';
    }

    // Sales Agent’s Name Validation
    const salesAgentName = document.getElementById('salesAgentName');
    const salesAgentNameError = document.getElementById('salesAgentNameError');
    if (salesAgentName.value === '') {
      salesAgentNameError.textContent = 'Please select a sales agent.';
      salesAgentNameError.style = "color:red";
      valid = false;
    } else {
      salesAgentNameError.textContent = '';
    }

    // Date and Time Validation
    const dateTime = document.getElementById('dateTime');
    const dateTimeError = document.getElementById('dateTimeError');
    if (dateTime.value === '') {
      dateTimeError.textContent = 'Please select date and time.';
      dateTimeError.style = "color:red";
      valid = false;
    } else {
      dateTimeError.textContent = '';
    }

    // Branch Name Validation
    const branch = document.getElementById('branch');
    const branchError = document.getElementById('branchError');
    if (branch.value === '') {
      branchError.textContent = 'Please select a branch.';
      branchError.style = "color:red";
      valid = false;
    } else {
      branchError.textContent = '';
    }

    if (!valid) {
      event.preventDefault(); // Stop form submission if validation fails
    }
  });

  // Select the necessary elements from the form
  const tonnageInput = document.getElementById('tonnage');
  const costInput = document.getElementById('pricePerTon'); // Reference correct price input
  const totalCostInput = document.getElementById('amountPaid');

  // Function to calculate the total cost
  function calculateTotalCost() {
    const tonnage = parseFloat(tonnageInput.value);
    const pricePerTon = parseFloat(costInput.value);

    // Ensure the inputs are valid numbers
    if (!isNaN(tonnage) && !isNaN(pricePerTon)) {
      const totalCost = tonnage * pricePerTon;
      totalCostInput.value = totalCost.toFixed(2); // Set the total cost input value
    } else {
      totalCostInput.value = ''; // Clear the total cost if inputs are invalid
    }
  }

  // Event listeners to trigger the calculation when input values change
  tonnageInput.addEventListener('input', calculateTotalCost);
  costInput.addEventListener('input', calculateTotalCost);
});
