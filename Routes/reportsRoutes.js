
const express = require('express');
const router = express.Router();





//for managers only connectEnsure login.ensureloggedin{},
router.get("/reports", async(req,res)=> {
    req.senssion.user = req.user;
    if(req.user.role == "manager"){
        try{
            //new
            //instatiate a crop variable youbwill use to select crop
            let selectedProduce;
            if (req.query.searchProduce)
                selectedProduce = req.query.searchProduce;
            //query for returning all tonnage and revenue of a produce
            let items = await produce.find({producename:selectedProduce});
            // console.log ("products frm the db ", goods)

            console.log("products from the db after search", items)

            let totalCereals = await Produce.aggregate([
                { $match: { producetype: "cereals" } },
                { $group: { _id:null,
                stockQuantity:{ $sum:"$tonnage" },
                totalExpense: { $sum:"$totalCost" },
                totalProjectedRevenue:{ $sum: { "$multiply: [ "$sellingPrice", "$tonnage" ] } },
                    }}
            
                

            ])
        
            let totalLegumes = await produce.aggrigate([
                { $match: { producetype: "legume" } },
                { $group: { _id: "$all" ,
                stockQuantity:{ $sum:"$tonnage" },
                totalExpense: { $sum:"$totalCost" },
                totalProjectedRevenue: { $sum: { "$multiply: [ "$sellingPrice", "$tonnage" ] } },
                    }}

            ])

    //get total quantity and cost of produce
    let totalCrop = await produce.aggregate({
        { $match: { producename: selectedProduce } },
        { $group: { _id: "$producename" ,
         stockQuantity:{ $sum:"$tonnage" },
        totalExpense: { $sum:"$totalCost" },
    })

})

module.exports = router;
