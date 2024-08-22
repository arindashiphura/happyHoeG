document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('add-produce-form');

    form.addEventListener('submit', function (event) {
        let valid = true;

        // Clear all previous error messages
        const errorMessages = document.querySelectorAll('small');
        errorMessages.forEach(error => error.textContent = '');

        // Name of Produce validation
        const produceName = document.getElementById('name');
        const pnameErr = document.getElementById('pnameErr');
        if (produceName.value === "") {
            pnameErr.textContent = "Please select the name of the produce.";
            valid = false;
        }

        // Type of Produce validation
        const produceType = document.getElementById('type');
        const ptypeErr = document.getElementById('ptypeErr');
        if (produceType.value === "") {
            ptypeErr.textContent = "Please select the type of produce.";
            valid = false;
        }

        // Date of Purchase validation
        const dateOfPurchase = document.getElementById('date');
        const pdateErr = document.getElementById('pdateofpurchaseErr');
        if (dateOfPurchase.value === "") {
            pdateErr.textContent = "Please select the date of purchase.";
            valid = false;
        }

        // Time of Purchase validation
        const timeOfPurchase = document.getElementById('time');
        const ptimeErr = document.getElementById('ptimeofpurchaseErr');
        if (timeOfPurchase.value === "") {
            ptimeErr.textContent = "Please select the time of purchase.";
            valid = false;
        }

        // Tonnage validation
        const tonnage = document.getElementById('tonnage');
        const ptonnageErr = document.getElementById('ptonnageErr');
        if (tonnage.value === "" || tonnage.value <= 0) {
            ptonnageErr.textContent = "Please enter a valid tonnage.";
            valid = false;
        }

        // Cost of produce per kg validation
        const produceCostPerKg = document.getElementById('cost');
        const pcostErr = document.getElementById('pcostErr');
        if (produceCostPerKg.value === "" || produceCostPerKg.value <= 0) {
            pcostErr.textContent = "Please enter a valid cost per kg.";
            valid = false;
        }

        // Source of Produce validation
        const sourceOfProduce = document.getElementById('source');
        const psourceErr = document.getElementById('psourceofproduceErr');
        if (sourceOfProduce.value === "") {
            psourceErr.textContent = "Please select the source of the produce.";
            valid = false;
        }

        // Branch of storage validation
        const branchOfStorage = document.getElementById('branch');
        const pbranchErr = document.getElementById('pbranchErr');
        if (branchOfStorage.value === "") {
            pbranchErr.textContent = "Please select the branch of storage.";
            valid = false;
        }

        // Source Contact validation
        const contact = document.getElementById('contact');
        const contactErr = document.getElementById('pcontactErr');
        const phoneRegex = /^[0-9]{10}$/;
        if (contact.value === "" || !phoneRegex.test(contact.value)) {
            contactErr.textContent = "Please enter a valid contact number (10 digits).";
            valid = false;
        }

        // Price to be Sold At per kg validation
        const sellingPrice = document.getElementById('price');
        const priceErr = document.getElementById('ppriceErr');
        if (sellingPrice.value === "" || sellingPrice.value <= 0) {
            priceErr.textContent = "Please enter a valid selling price per kg.";
            valid = false;
        }

        // Prevent form submission if validation fails
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
