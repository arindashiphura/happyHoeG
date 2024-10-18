const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');



// Importing models
const Produce = require('../Models/produce');
const Signupkgl = require('../Models/signupkgl');



//get all produce frm the db
router.get("/procurements", connectEnsureLogin.ensureLoggedIn(), async (req, res)=>{
    try{
        const produceItems = await Produce.find().sort({$natural: -1}); //this line is for sorting  the new produce
        res.render("procurements",{
            title: "produce List",
            produces: produceItems,

            // TotalProduce: totalGrainMaize[0], 
            // TotalSell: totalGrainMaizeSell[0]

        });
    }catch(err){
        res.status(400).send("Unable to find items in the database");
    }
});


      

module.exports = router;
