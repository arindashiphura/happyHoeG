document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('add-produce-form').addEventListener('submit', function(event) {
    let valid = true;

    // Name of Produce Validation (must not be empty)
    const produceName = document.getElementById('name');
    const pnameErr = document.getElementById('pnameErr');
    if (produceName.value === '') {
      pnameErr.textContent = 'Please select a produce name.';
      valid = false;
    } else {
      pnameErr.textContent = '';
    }

    // Type of Produce Validation (must not be empty)
    const produceType = document.getElementById('type');
    const ptypeErr = document.getElementById('ptypeErr');
    if (produceType.value === '') {
      ptypeErr.textContent = 'Please select a produce type.';
      valid = false;
    } else {
      ptypeErr.textContent = '';
    }

    // Date Validation (not empty)
    const date = document.getElementById('date');
    const pdateofpurchaseErr = document.getElementById('pdateofpurchaseErr');
    if (date.value === '') {
      pdateofpurchaseErr.textContent = 'Please select a date.';
      valid = false;
    } else {
      pdateofpurchaseErr.textContent = '';
    }

    // Time Validation (not empty)
    const time = document.getElementById('time');
    const ptimeofpurchaseErr = document.getElementById('ptimeofpurchaseErr');
    if (time.value === '') {
      ptimeofpurchaseErr.textContent = 'Please select a time.';
      valid = false;
    } else {
      ptimeofpurchaseErr.textContent = '';
    }

    // Tonnage Validation (numeric, at least 3 digits)
    const tonnage = document.getElementById('tonnage');
    const ptonnageErr = document.getElementById('ptonnageErr');
    if (tonnage.value === '' || isNaN(tonnage.value) || tonnage.value.length < 3) {
      ptonnageErr.textContent = 'Tonnage must be a numeric value with at least 3 digits.';
      valid = false;
    } else {
      ptonnageErr.textContent = '';
    }

    // Cost Validation (numeric, at least 3 digits)
    const cost = document.getElementById('cost');
    const pcostErr = document.getElementById('pcostErr');
    if (cost.value === '' || isNaN(cost.value) || cost.value.length < 3) {
      pcostErr.textContent = 'Cost must be a numeric value with at least 3 digits.';
      valid = false;
    } else {
      pcostErr.textContent = '';
    }

    // Total Cost Validation (numeric, at least 3 digits)
    const totalCost = document.getElementById('totalcost');
    const ptotalcostErr = document.getElementById('ptotalcostErr');
    if (totalCost.value === '' || isNaN(totalCost.value) || totalCost.value.length < 3) {
      ptotalcostErr.textContent = 'Total Cost must be a numeric value with at least 3 digits.';
      valid = false;
    } else {
      ptotalcostErr.textContent = '';
    }

    // Source Validation (must not be empty)
    const source = document.getElementById('source');
    const psourceofproduceErr = document.getElementById('psourceofproduceErr');
    if (source.value === '') {
      psourceofproduceErr.textContent = 'Please select a source.';
      valid = false;
    } else {
      psourceofproduceErr.textContent = '';
    }

    // Dealer Validation (optional, not empty)
    const dealer = document.getElementById('dealer');
    const pdealerErr = document.getElementById('pdealerErr');
    if (dealer.value !== '' && dealer.value.length < 2) {
      pdealerErr.textContent = 'Dealer name must be at least 2 characters long.';
      valid = false;
    } else {
      pdealerErr.textContent = '';
    }

    // Company Validation (optional, not empty)
    const company = document.getElementById('company');
    const pcompanyErr = document.getElementById('pcompanyErr');
    if (company.value !== '' && company.value.length < 2) {
      pcompanyErr.textContent = 'Company name must be at least 2 characters long.';
      valid = false;
    } else {
      pcompanyErr.textContent = '';
    }

    // Branch Validation (must not be empty)
    const branch = document.getElementById('branch');
    const pbranchErr = document.getElementById('pbranchErr');
    if (branch.value === '') {
      pbranchErr.textContent = 'Please select a branch.';
      valid = false;
    } else {
      pbranchErr.textContent = '';
    }

    // Contact Validation (must be valid phone number format)
    const contact = document.getElementById('contact');
    const pcontactErr = document.getElementById('pcontactErr');
    const phonePattern = /^[0-9]{10,}$/; // Adjust based on expected phone number format
    if (contact.value === '' || !phonePattern.test(contact.value)) {
      pcontactErr.textContent = 'Please enter a valid contact number.';
      valid = false;
    } else {
      pcontactErr.textContent = '';
    }

    // Price Validation (numeric, at least 3 digits)
    const price = document.getElementById('price');
    const ppriceErr = document.getElementById('ppriceErr');
    if (price.value === '' || isNaN(price.value) || price.value.length < 3) {
      ppriceErr.textContent = 'Price must be a numeric value with at least 3 digits.';
      valid = false;
    } else {
      ppriceErr.textContent = '';
    }

    if (!valid) {
      event.preventDefault();
    }
  });

});


// addproduce
// Select the necessary elements from the form
const tonnageInput = document.getElementById('tonnage');
const costInput = document.getElementById('cost');
const totalCostInput = document.getElementById('totalcost');

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