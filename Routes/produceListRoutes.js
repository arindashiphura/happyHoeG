const express = require('express');
const router = express.Router();





// get produce update form
router.get("/updateProduce/:id", async (req, res) => {
    try {
    const item = await Produce.findOne({ _id: req.params.id });
    res.render("edit_produce", {
    title: "Update Produce",
    produce: item,
    });
    } catch (err) {
    res.status(400).send("Unable to find item in the database");
    }
    });
    
    // post updated produce
    router.post("/updateProduce", async (req, res) => {
    try {
    await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/produceList");
    } catch (err) {
    res.status(404).send("Unable to update item in the database");
    }
    });






   
module.exports = router;
