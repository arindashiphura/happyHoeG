const express = require('express');
const router = express.Router();



// Import the  models
const Credit = require("../Models/credit");
const Signupkgl = require('../Models/signupkgl');
const Produce = require('../Models/produce');




//routes for mking a credit
router.get("/credit/:id", async(req, res) => {
    try {
    const agents = await Signupkgl.find({ role: "sales-agent" });
    const produce = await Produce.findOne({ _id: req.params.id })
    console.log(produce)
    console.log("Requested ID:", req.params.id);

    res.render("credit_sales", {
    title: "Credit",
    agents: agents,
    produce: produce
    });
    } catch (error) {
    console.log(error);
        res.status(400).send("Unable to find sales agents in the database");
    }
    });
    
    router.post('/credit/:id', async (req, res) => {
    try {
    const { creditTonnage } = req.body;
    // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
    const produce = await Produce.findById({ _id: req.params.id });
    if (!produce) {
    return res.status(404).send('produce not found');
    }                     
    
    if (produce.tonnage < creditTonnage ) {
    return res.status(400).send(`Not enough tones in stock,there are ${produce.tonnage} Kgs in stock`);
    }
    if (produce && produce.tonnage > 0) {
    const newcredit = new Credit(req.body);
    await newcredit.save();
    produce.tonnage -= creditTonnage; // short form of what is below
    // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
    await produce.save();
    res.redirect("/creditList");
    } else {
    return res.status(404).json({ error: 'Produce out of stock' });
    }
    } catch (error) {
    console.error('Error saling produce:', error);
    return res.status(400).json({ error: 'Internal server error' });
    }
    });
    
    // retrieve sales from the database
    router.get("/creditList", async (req, res) => {
        try {
            // Fetching the sales data from the database and populating the necessary fields
            const credits = await Credit.find()
                .sort({ $natural: -1 }) // Sorting the sales in reverse order of insertion
                .populate("produceName", "producename") // Populating the producename field from the related Produce model
                .populate("salesAgentName", "username") // Populating the salesAgent field from the related Signupkgl model


                // Calculating the total sales amount by aggregating the 'amountPaid' field
                let totalCredits = await Credit.aggregate([
                    {
                      $group: {
                        _id: null,  // Grouping by null will aggregate all documents together
                        total: { $sum: "$amountPaid" }  // Ensure "amountPaid" is the correct field name
                      }
                    }
                  ]);
                  
    
            // Rendering the salesList template and passing the fetched sales data to it
            res.render("creditList", {
                title: "Credit List",
                credits: credits, // Correctly passing the sales data to the template

                Totalpay: totalCredits[0], 
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
    router.get('/edit_credit/:id', async (req, res) => {
        try {
            // Fetch sale by ID
            const credit = await Credit.findById(req.params.id)
                .populate('produceName', 'producename')
                .populate('salesAgentName', 'username') // Ensure you have 'salesAgent' populated
    
            if (!credit) {
                return res.status(404).send('Credit not found');
            }
    
            // Fetch agents for the dropdown
            const agents = await Signupkgl.find();
    
            // Format date for the input field
            const formattedDate = formatDate(credit.dueDate);
    
            // Render the edit form with the sale data and agents
            res.render('edit_credits', {
                credit,
                formattedDate,
                agents,
                title: 'Update Credits',
            });
        } catch (err) {
            console.log(Credit); // Verify that sale.storeBranch is present and contains the expected value
            console.error('Error fetching sale:', err);
            res.status(500).send('Unable to fetch credit details');
        }
    });


   

// // route for posting edit credit

router.post("/edit_credit/:id", async (req, res) => {
    try {
    await Credit.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("/creditList");
    } catch (err) {
        console.error(err); // Log the error for debugging
    res.status(404).send("Unable to update item in the database");
    }
    });






    //delete credits list
    router.post("/deleteCredit", async (req, res) => {
        try {
            await Credit.deleteOne({ _id: req.body.id });
            res.redirect("back");
            } catch (err) {
            res.status(404).send("Unable to delete item in the database");
            }
            });




            router.get('/receipts/:id', async (req, res) => {
                try {
                    // Fetch sale by ID
                    const credit = await Credit.findById(req.params.id)
                        .populate('produceName', 'producename')
                        .populate('salesAgentName', 'username') // Ensure you have 'creditsAgent' populated
        
            
                    if (!credit) {
                        return res.status(404).send('Credit not found');
                    }
            
                    // Fetch agents for the dropdown
                    const agents = await Signupkgl.find();
            
                    // Format date for the input field
                    const formattedDate = formatDate(credit.dueDate);
            
                    // Render the edit form with the credit data and agents
                    res.render('creditReceipt', {
                        credit,
                        formattedDate,
                        agents,
                        title: 'Receipt',
                    });
                } catch (err) {
                    console.log(Credit); // Verify that credit.storeBranch is present and contains the expected value
                    console.error('Error fetching credit:', err);
                    res.status(500).send('Unable to fetch credit details');
                }
            });
module.exports = router;
