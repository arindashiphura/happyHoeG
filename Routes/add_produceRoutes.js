
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Importing models
const Produce = require('../Models/produce');
const Signupkgl = require('../Models/signupkgl');



// Route for rendering the add-produce page
router.get('/produce', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    res.render('add_produce', { title: 'Add Produce' });  // 'Add Produce' is now a string
});

// Route for handling the form submission to add new produce
router.post('/produce', connectEnsureLogin.ensureLoggedIn(),  async (req, res) => {
    try {
        const newProduce = new Produce(req.body);  // 'Produce' should be capitalized to match the model
        await newProduce.save();
        res.redirect('/producelist');
    } catch (err) {
        res.status(400).send('Unable to save produce to database');
        console.log('Error saving produce:', err);
    }
});



//get all produce frm the db
router.get("/produceList", connectEnsureLogin.ensureLoggedIn(),  async (req, res)=>{
    try{
        const produceItems = await Produce.find().sort({$natural: -1}); //this line is for sorting  the new produce
        res.render("produceList",{
            title: "produce List",
            produces: produceItems
        });
    }catch(err){
        res.status(400).send("Unable to find items in the database");
    }
});

//get all produce frm the db
router.get("/sale",   async (req, res)=>{
    try{
        const produceItems = await Produce.find().sort({$natural: -1}); //this line is for sorting  the new produce
        res.render("sale",{
            title: "produce List",
            produces: produceItems
        });
    }catch(err){
        res.status(400).send("Unable to find items in the database");
    }
});


//stock
router.get('/stock', async (req, res) => {
    try {
        let produces = await Produce.find(); // Fetch procurement data
        // Ensure there are exactly six items
        produces = produces.slice(0, 12); // Limit to six items if necessary
        res.render('stock', { produces });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// get produce update form
router.get("/edit_produce/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
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

// //route for getting the edit file
//     router.get("/update_produce/:id", async (req, res) => {
//         try {
//         const item = await Produce.findOne({ _id: req.params.id });
//         res.render("edit_produce", {
//         title: "Update Produce",
//         });
//         } catch (err) {
//         res.status(400).send("Unable to find item in the database");
//         }
//         });
    



    
    // route editing produce in the edit file
    router.post("/edit_produce/:id", async (req, res) => {
    try {
    await Produce.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("/produceList");
    } catch (err) {
        console.error(err); // Log the error for debugging
    res.status(404).send("Unable to update item in the database");
    }
    });




// //route for updating produce
//     router.post("/edit_Produce/:id", async (req, res) => {
//         try {
//             await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
//             res.redirect("/produceList");
//         } catch (err) {
//             res.status(404).send("Unable to update item in the database");
//         }
//     });
    



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




