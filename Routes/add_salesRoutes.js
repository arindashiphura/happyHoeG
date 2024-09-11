const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


// Importing models
const Sale = require('../Models/sale');
const Signupkgl = require('../Models/signupkgl');
const Produce = require('../Models/produce');





  // Routes for making sale

  router.get("/addSale/:id", connectEnsureLogin.ensureLoggedIn(), async(req, res) => {
    try {
    const agents = await Signupkgl.find({ role: "sales-agent" });
    const produce = await Produce.findOne({ _id: req.params.id })
    console.log(produce)
    console.log("Requested ID:", req.params.id);

    res.render("recordSales", {
    title: "Sale",
    agents: agents,
    produce: produce
    });
    } catch (error) {
    console.log(error);
        res.status(400).send("Unable to find sales agents in the database");
    }
    });
    
    router.post('/addSale/:id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
    const { saleTonnage } = req.body;
    // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
    const produce = await Produce.findById({ _id: req.params.id });
    if (!produce) {
    return res.status(404).send('produce not found');
    }
    
    if (produce.tonnage < saleTonnage ) {
    return res.status(400).send(`Not enough tones in stock,there are ${produce.tonnage} Kgs in stock`);
    }
    if (produce && produce.tonnage > 0) {
    const newsale = new Sale(req.body);
    await newsale.save();
    produce.tonnage -= saleTonnage; // short form of what is below
    // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
    await produce.save();
    res.redirect("/salesList");
    } else {
    return res.status(404).json({ error: 'Produce out of stock' });
    }
    } catch (error) {
    console.error('Error saling produce:', error);
    return res.status(400).json({ error: 'Internal server error' });
    }
    });
    
    // retrieve sales from the database
    router.get("/salesList", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
        try {
            // Fetching the sales data from the database and populating the necessary fields
            const sales = await Sale.find()
                .sort({ $natural: -1 }) // Sorting the sales in reverse order of insertion
                .populate("producename", "producename") // Populating the producename field from the related Produce model
                .populate("salesAgent", "username") // Populating the salesAgent field from the related Signupkgl model


                // Calculating the total sales amount by aggregating the 'amountPaid' field
                let totalSales = await Sale.aggregate([
                    {
                      $group: {
                        _id: null,  // Grouping by null will aggregate all documents together
                        total: { $sum: "$amountPaid" }  // Ensure "amountPaid" is the correct field name
                      }
                    }
                  ]);
                  
    
            // Rendering the salesList template and passing the fetched sales data to it
            res.render("salesList", {
                title: "Sales List",
                sales: sales, // Correctly passing the sales data to the template

                Totalpay: totalSales[0], 
            });
        } catch (error) {
            // Handling any errors that occur during the process
            res.status(400).send("Unable to find items in the database");
            console.log(error); // Logging the error for debugging purposes
        }
    });
    
           //agentsDashboard
           router.get("/agentsDashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
            try {
                // Fetching the sales data from the database and populating the necessary fields
                const sales = await Sale.find()
                    .sort({ $natural: -1 }) // Sorting the sales in reverse order of insertion
                    .populate("producename", "producename") // Populating the producename field from the related Produce model
                    .populate("salesAgent", "username") // Populating the salesAgent field from the related Signupkgl model
    
    
                    // Calculating the total sales amount by aggregating the 'amountPaid' field
                    let totalSales = await Sale.aggregate([
                        {
                          $group: {
                            _id: null,  // Grouping by null will aggregate all documents together
                            total: { $sum: "$amountPaid" }  // Ensure "amountPaid" is the correct field name
                          }
                        }
                      ]);
                      
        
                // Rendering the agentsDashboard template and passing the fetched sales data to it
                res.render("agentsDashboard", {
                    title: "Sales List",
                    sales: sales, // Correctly passing the sales data to the template
    
                    Totalpay: totalSales[0], 
                });
            } catch (error) {
                // Handling any errors that occur during the process
                res.status(400).send("Unable to find items in the database");
                console.log(error); // Logging the error for debugging purposes
            }
        });

    



    function formatDate(date) {
        return date.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
    }
    
    // Route to get the sale edit form
    router.get('/edit_sale/:id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
        try {
            // Fetch sale by ID
            const sale = await Sale.findById(req.params.id)
                .populate('producename', 'producename')
                .populate('salesAgent', 'username') // Ensure you have 'salesAgent' populated
    
            if (!sale) {
                return res.status(404).send('Sale not found');
            }
    
            // Fetch agents for the dropdown
            const agents = await Signupkgl.find();
    
            // Format date for the input field
            const formattedDate = formatDate(sale.dateTime);
    
            // Render the edit form with the sale data and agents
            res.render('edit_sales', {
                sale,
                formattedDate,
                agents,
                title: 'Update Sale',
            });
        } catch (err) {
            console.log(Sale); // Verify that sale.storeBranch is present and contains the expected value
            console.error('Error fetching sale:', err);
            res.status(500).send('Unable to fetch sale details');
        }
    });


   


    // post updated sale
    router.post("/edit_sale/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
        try {
            // Find the Produce by its name (from req.body)
            const produce = await Produce.findOne({ producename: req.body.producename });
    
            if (!produce) {
                return res.status(404).send("Produce not found");
            }
    
            // Update the sale by setting producename as the ObjectId of the found Produce
            await Sale.findOneAndUpdate(
                { _id: req.params.id }, 
                { 
                    ...req.body, 
                    producename: produce._id // Set the producename as ObjectId
                }
            );
    
            res.redirect("/salesList"); // Redirect after successful update
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).send("Unable to update item in the database");
        }
    });



    //delete sale
    router.post("/deleteSale", async (req, res) => {
        try {
            await Sale.deleteOne({ _id: req.body.id });
            res.redirect("back");
        } catch (err) {
            res.status(404).send("Unable to delete item in the database");
        }
    });





    // sales receipt
    router.get('/receipt/:id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
        try {
            // Fetch sale by ID
            const sale = await Sale.findById(req.params.id)
                .populate('producename', 'producename')
                .populate('salesAgent', 'username') // Ensure you have 'salesAgent' populated

    
            if (!sale) {
                return res.status(404).send('Sale not found');
            }
    
            // Fetch agents for the dropdown
            const agents = await Signupkgl.find();
    
            // Format date for the input field
            const formattedDate = formatDate(sale.dateTime);
    
            // Render the edit form with the sale data and agents
            res.render('salesReceipt', {
                sale,
                formattedDate,
                agents,
                title: 'Receipt',
            });
        } catch (err) {
            console.log(Sale); // Verify that sale.storeBranch is present and contains the expected value
            console.error('Error fetching sale:', err);
            res.status(500).send('Unable to fetch sale details');
        }
    });




    
    module.exports = router;
