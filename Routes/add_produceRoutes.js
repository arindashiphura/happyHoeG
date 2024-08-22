
const express = require('express');
const router = express.Router();

// Importing models
const Produce = require('../Models/produce');
const sales = require('../Models/recordSales');

// Route for rendering the add-produce page
router.get('/produce', (req, res) => {
    res.render('add_produce', { title: 'Add Produce' });  // 'Add Produce' is now a string
});

// Route for handling the form submission to add new produce
router.post('/produce', async (req, res) => {
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
router.get("/produceList", async (req, res)=>{
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


    // router.get("/edit_produce/:id", async (req, res) => {
    //     try {
    //     const item = await Produce.findOne({ _id: req.params.id });
    //     res.render("edit_produce", {
    //     title: "Update Produce",
    //     });
    //     } catch (err) {
    //     res.status(400).send("Unable to find item in the database");
    //     }
    //     });
    



    
    // post updated produce
    router.post("/edit_produce", async (req, res) => {
    try {
    await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/produceList");
    } catch (err) {
    res.status(404).send("Unable to update item in the database");
    }
    });


    // router.post("/edit_produce/:id", async (req, res) => {
    //     try {
    //         await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
    //         res.redirect("/produceList");
    //     } catch (err) {
    //         res.status(404).send("Unable to update item in the database");
    //     }
    // });
    



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
    
    





        //Routes for making sale

// router.get("/addSale/:id", async(req, res) => {
//     try {
//     const agents = await Signupkgl.find({ role: "salesagent" });
//     const produce = await Produce.findOne({ _id: req.params.id })
//     res.render("recordSales", {
//     title: "Sale",
//     agents: agents,
//     produce: produce
//     });
//     } catch (error) {
//     res.status(400).send("Unable to find sales agents in the database");
//     }
//     });
    
//     router.post('/addSale/:id', async (req, res) => {
//     try {
//     const { saleTonnage } = req.body;
//     // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
//     const produce = await Produce.findById({ _id: req.params.id });
//     if (!produce) {
//     return res.status(404).send('produce not found');
//     }
    
//     if (produce.tonnage < saleTonnage ) {
//     return res.status(400).send(`Not enough tones in stock,there are ${produce.tonnage} Kgs in stock`);
//     }
//     if (produce && produce.tonnage > 0) {
//     const newsale = new Sale(req.body);
//     await newsale.save();
//     produce.tonnage -= saleTonnage; // short form of what is below
//     // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
//     await produce.save();
//     res.redirect("/salesList");
//     } else {
//     return res.status(404).json({ error: 'Produce out of stock' });
//     }
//     } catch (error) {
//     console.error('Error saling produce:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//     }
//     });
    
//     // retrieve sales from the database
//     router.get("/salesList", async (req, res) => {
//     try {
//     const sales = await Sale.find()
//     .sort({$natural:-1})
//     .populate("produceName", "produceName")
//     .populate("salesAgent", "username")
//     res.render("sales_list", {
//     title: "Sales List",
//     sales: sales,
//     });
//     } catch (error) {
//     res.status(400).send("Unable to find items in the database");
//     }
//     });

module.exports = router;
