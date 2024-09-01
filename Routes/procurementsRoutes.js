const express = require('express');
const router = express.Router();


// Importing models
const Produce = require('../Models/produce');
const Signupkgl = require('../Models/signupkgl');



//get all produce frm the db
router.get("/procurements", async (req, res)=>{
    try{
        const produceItems = await Produce.find().sort({$natural: -1}); //this line is for sorting  the new produce
        res.render("procurements",{
            title: "produce List",
            produces: produceItems
        });
    }catch(err){
        res.status(400).send("Unable to find items in the database");
    }
});


// get produce update form
router.get("/edit_produce/:id", async (req, res) => {
    try {
    const produce = await Produce.findOne({ _id: req.params.id });
    res.render("edit_produce", {
    produce: produce,
    title: "Update Produce",
    });
    } catch (err) {
    res.status(400).send("Unable to find item in the database");
    }
    });

//route for getting the edit file
    router.get("/update_produce/:id", async (req, res) => {
        try {
        const item = await Produce.findOne({ _id: req.params.id });
        res.render("edit_produce", {
        title: "Update Produce",
        });
        } catch (err) {
        res.status(400).send("Unable to find item in the database");
        }
        });
    



    
    // route editing produce in the edit file
    router.post("/update_produce/:id", async (req, res) => {
    try {
    await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/procurements");
    } catch (err) {
    res.status(404).send("Unable to update item in the database");
    }
    });




//route for updating produce
    router.post("/edit_produce/:id", async (req, res) => {
        try {
            await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
            res.redirect("/procurements");
        } catch (err) {
            res.status(404).send("Unable to update item in the database");
        }
    });
    



    //delete user
    //delete produce
    router.post("/deleteProduce", async (req, res) => {
    try {
        await Produce.deleteOne({ _id: req.body.id });
        res.redirect("back");
        } catch (err) {
        res.status(404).send("Unable to delete item in the database");
        }
        });
    
    



        

      

module.exports = router;
