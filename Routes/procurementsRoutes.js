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
            produces: produceItems,

            // TotalProduce: totalGrainMaize[0], 
            // TotalSell: totalGrainMaizeSell[0]

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
    
    



        





        







router.get("/branch", async (req, res) => {
    try {
        const produceItems = await Produce.find().sort({$natural: -1}); // Fetch all produce items

        // Aggregate the total produce for each branch
        let totalProduceByBranch = await Produce.aggregate([
          {
            $group: {
              _id: "$storebranch", // Group by branchName
              totalTonnage: { $sum: "$tonnage" }, // Sum the tonnage for each branch
              totalSellingPrice: { $sum: "$sellingpriceperkg" }, // Sum the selling price per kg for each branch
              totalItems: { $sum: 1 } // Count the number of produce entries for each branch
            }
          }
        ]);

        // Render the procurement page with the aggregated data
        res.render("branch", {
            title: "Produce List",
            produces: produceItems,
            totalProduceByBranch: totalProduceByBranch // Pass the aggregated data to the view
        });
    } catch (err) {
        console.error("Error fetching procurements:", err);
        res.status(400).send("Unable to find items in the database");
    }
});









async function aggregateMatugaProduce() {
  try {
    const matugaData = await Produce.aggregate([
      { $match: { branchName: "Matuga" } }, // Filter for Matuga branch
      {
        $group: {
          _id: null, // Group all data
          totalTonnage: { $sum: "$tonnage" }, // Sum up the tonnage
          totalCost: { $sum: "$cost" }, // Sum up the cost
          count: { $sum: 1 } // Count the number of records
        }
      }
    ]);

    console.log(matugaData);
  } catch (error) {
    console.error("Error in aggregation:", error);
  }
}

      

module.exports = router;
