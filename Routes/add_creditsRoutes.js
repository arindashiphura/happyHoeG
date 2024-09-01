const express = require('express');
const router = express.Router();



// Import the  models
const Credit = require("../Models/credit");



// Route to render the credit page
router.get('/credit', (req, res)=>{
    res.render('credit_sales', { title: 'Add Credit' });  // 'Credit' is now a string
});

// Route to handle the form submission to add new credit
router.post('/credit', async (req, res)=>{
    try {
        const newCredit = new Credit(req.body);
        await newCredit.save();
        res.redirect("/creditList");
          // 'Credit' should be capitalized to match the model
}catch (err) {
    res.status(400).send("Unable to save credit in the db");
    console.log("Add credit error", err);
}
});


// get all credits information frm the db
router.get('/creditList', async (req, res)=>{
try{
    const creditItems = await Credit.find().sort({$natural: -1});
    res.render("creditList",{
        title: "Credit List",
        credits: creditItems
    });
}catch(err){
    res.status(400).send("Unable to find items in the database");
    // console.log("Error fetching produce", error);
}
});


//route for making credit
router.get("/edit_Credit/:id", async (req, res) =>{
    try{
        const credit = await Credit.findOne({ _id: req.params.id });
        res.render("edit_credits", {
            credit: credit,
            title: "Update Credit"
        });
    } catch(err) {
        res.status(400).send("Unable to find credit in the database");
    }
});


// route for posting edit credit
router.post("/edit_Credit/:id", async (req, res) =>{
    try{
        const credit = await Credit.findOne({ _id: req.params.id });
        res.render("creditList", {
            credit: credit,
            title: "Update Credit"
        });
    } catch(err) {
        res.status(400).send("Unable to find credit in the database");
    }
});

// routes for updating sales
router.get("/addCredit/:id", async (req, res) =>{
    try{
        const credit = await Credit.findOne({ _id: req.params.id });
        res.render("credit_sales", {
            credit: credit,
            title: "Update Credit"
        });
    } catch(err) {
        res.status(400).send("Unable to find credit in the database");
    }
});
router.post("/edit_credit/:id", async (req, res) =>{
    try{
        const credit = await Credit.findOne({ _id: req.params.id });
        res.render("edit_credits", {
            credit: credit,
            title: "Update Credit"
        });
    } catch(err) {
        res.status(400).send("Unable to find credit in the database");
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

module.exports = router;
