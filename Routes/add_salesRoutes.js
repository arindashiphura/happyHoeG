const express = require('express');
const router = express.Router();

// Importing models
const Sale = require('../Models/recordSales');
const Signupkgl = require('../Models/signupkgl');
const Produce = require('../Models/produce');





  // Routes for making sale

  router.get("/addSale/:id", async(req, res) => {
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
    
    router.post('/addSale/:id', async (req, res) => {
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
    router.get("/salesList", async (req, res) => {
    try {
    const recordSales = await Sale.find()
    .sort({$natural:-1})
    .populate("producename", "producename")
    .populate("salesAgent", "username")
    res.render("salesList", {
    title: "Sales List",
    sales: sales,
    });
    } catch (error) {
    res.status(400).send("Unable to find items in the database");
    }
    });


    



//finction to formart the date
function formartDate(date) {
    return date.toISOString().splint("T")[0];
}
//get sale update form
    router.get("/edit_sale/:id", async (req, res) => {
    try {
    const sale = await sale.findOne({ _id: req.params.id })
    .populate("producename", "producename")
    const formarttedDate = formartDate(sale.saledate);
    res.render("edit_sale", {
        sale,
        formattedDate,
        title: "Update Sale",
    })
}catch (err) {
    res.status(400).send("Unable to find item in the database");
}
    });


   


    // post updated sale
    router.post("/edit_sale", async(req, res) => {
        try {
            await sale.findOneAndUpdate({ _id: req.query.id},req.body);
            res.redirect("/salesList");
        }catch (err) {
            res.status(404).send("Unable to update item in the database");
        }
    });



    //delete sale
    router.post("/deleteSale", async (req, res) => {
        try {
            await sale.deleteOne({ _id: req.body.id });
            res.redirect("back");
        } catch (err) {
            res.status(404).send("Unable to delete item in the database");
        }
    });


    module.exports = router;
