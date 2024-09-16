document.addEventListener('DOMContentLoaded', function () {
    const creditForm = document.getElementById('creditForm');
  
    creditForm.addEventListener('submit', function (event) {
      let valid = true;
  
      // Name of the Buyer Validation (alpha-numeric, at least 2 characters)
      const buyerName = document.getElementById('buyerName');
      const buyerNameError = document.getElementById('buyerNameError');
      const namePattern = /^[a-zA-Z0-9\s]{2,}$/; // Allows alphanumeric and spaces, at least 2 characters
      if (!namePattern.test(buyerName.value.trim())) {
        buyerNameError.textContent = 'Name of the Buyer must be at least 2 characters .';
        buyerNameError.style = "color:red";
        valid = false;
      } else {
        buyerNameError.textContent = '';
      }
  
      // National ID Validation (valid NIN format)
      const nationalId = document.getElementById('nationalId');
      const nationalIdError = document.getElementById('nationalIdError');
      const ninPattern = /^[A-Z0-9]{13,}$/; // Adjust this pattern according to the NIN format
      if (!ninPattern.test(nationalId.value.trim())) {
        nationalIdError.textContent = 'National ID must be at least 13 characters .';
        nationalIdError.style = "color:red";
        valid = false;
      } else {
        nationalIdError.textContent = '';
      }
  
      // Location Validation (alpha-numeric, at least 2 characters)
      const location = document.getElementById('location');
      const locationError = document.getElementById('locationError');
      if (!namePattern.test(location.value.trim())) {
        locationError.textContent = 'Location must be at least 2 characters .';
        locationError.style = "color:red";
        valid = false;
      } else {
        locationError.textContent = '';
      }
  
      const contacts = document.getElementById('contacts');
      const contactsError = document.getElementById('contactsError');
      const phonePattern = /^\+256\d{9}$/; // Corrected regex pattern
      if (!phonePattern.test(contacts.value.trim())) {
        contactsError.textContent = 'Please enter a valid phone number in the format +256XXXXXXXXX.';
        contactsError.style = "color:red";
        valid = false;
      } else {
        contactsError.textContent = '';
      }
  
      // Branch Validation (must not be empty)
      const branch = document.getElementById('branch');
      const branchError = document.getElementById('branchError');
      if (branch.value === '') {
        branchError.textContent = 'Please select a branch.';
        branchError.style = "color:red";
        valid = false;
      } else {
        branchError.textContent = '';
      }
  
      // Sales Agent Name Validation (alpha-numeric, at least 2 characters)
      const salesAgentName = document.getElementById('salesAgentName');
      const salesAgentNameError = document.getElementById('salesAgentNameError');
      if (!namePattern.test(salesAgentName.value.trim())) {
        salesAgentNameError.textContent = 'Sales Agent Name must be at least 2 characters .';
        salesAgentNameError.style = "color:red";
        valid = false;
      } else {
        salesAgentNameError.textContent = '';
      }
  
      // Due Date Validation (must be a valid date)
      const dueDate = document.getElementById('dueDate');
      const dueDateError = document.getElementById('dueDateError');
      if (dueDate.value === '') {
        dueDateError.textContent = 'Due Date is required.';
        dueDateError.style = "color:red";
        valid = false;
      } else {
        dueDateError.textContent = '';
      }
  
      // Produce Name Validation (alpha-numeric, at least 2 characters)
      const produceName = document.getElementById('produceName');
      const produceNameError = document.getElementById('produceNameError');
      if (!namePattern.test(produceName.value.trim())) {
        produceNameError.textContent = 'Produce Name must be at least 2 characters .';
        produceNameError.style = "color:red";
        valid = false;
      } else {
        produceNameError.textContent = '';
      }
  
      // Produce Type Validation (alpha-numeric, at least 2 characters)
      const produceType = document.getElementById('produceType');
      const produceTypeError = document.getElementById('produceTypeError');
      if (!namePattern.test(produceType.value.trim())) {
        produceTypeError.textContent = 'Produce Type must be at least 2 .';
        produceTypeError.style = "color:red";
        valid = false;
      } else {
        produceTypeError.textContent = '';
      }
  
      // Tonnage Validation (numeric, at least 1 digit)
      const tonnage = document.getElementById('tonnage');
      const tonnageError = document.getElementById('tonnageError');
      if (tonnage.value.trim() === '' || isNaN(tonnage.value) || tonnage.value <= 0) {
        tonnageError.textContent = 'Tonnage must be a numeric value greater than 0.';
        tonnageError.style = "color:red";
        valid = false;
      } else {
        tonnageError.textContent = '';
      }
  
      // Amount Due Validation (numeric, at least 5 digits)
      const amountDue = document.getElementById('amountDue');
      const amountDueError = document.getElementById('amountDueError');
      if (amountDue.value.trim() === '' || isNaN(amountDue.value) || amountDue.value.length < 5) {
        amountDueError.textContent = 'Amount Due  at least 5 digits.';
        amountDueError.style = "color:red";
        valid = false;
      } else {
        amountDueError.textContent = '';
      }

      // Amount Due Validation (numeric, at least 5 digits)
      const amountperkg = document.getElementById('amountperkg');
      const amountperkgError = document.getElementById('amountperkgError');
      if (amountperkg.value.trim() === '' || isNaN(amountperkg.value) || amountperkg.value.length < 3) {
        amountperkgError.textContent = 'Amount Due  at least 3 digits.';
        amountperkgError.style = "color:red";
        valid = false;
      } else {
        amountperkgError.textContent = '';
      }
  
      // Dispatch Date Validation (must be a valid date)
      const dispatchDate = document.getElementById('dispatchDate');
      const dispatchDateError = document.getElementById('dispatchDateError');
      if (dispatchDate.value === '') {
        dispatchDateError.textContent = 'Dispatch Date is required.';
        dispatchDateError.style = "color:red";
        valid = false;
      } else {
        dispatchDateError.textContent = '';
      }
  
      if (!valid) {
        event.preventDefault();
      }
    });
  
    // Initialize date pickers
    $("#dueDate, #dispatchDate").datepicker(); 
  });
  

  // addproduce
// Select the necessary elements from the form
const tonnageInput = document.getElementById('tonnage');
const costInput = document.getElementById('amountperkg');
const totalCostInput = document.getElementById('amountDue');

// Function to calculate the total cost
function calculateTotalCost() {
  const tonnage = parseFloat(tonnageInput.value);
  const costPerKg = parseFloat(costInput.value);

  // Ensure the inputs are valid numbers
  if (!isNaN(tonnage) && !isNaN(costPerKg)) {
    const totalCost = tonnage * costPerKg;
    totalCostInput.value = totalCost.toFixed(2); // Set the total cost input value
  } else {
    totalCostInput.value = ''; // Clear the total cost if inputs are invalid
  }
}

// Event listeners to trigger the calculation when input values change
tonnageInput.addEventListener('input', calculateTotalCost);
costInput.addEventListener('input', calculateTotalCost);