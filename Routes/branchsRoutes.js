



const express = require('express');
const router = express.Router();


// Importing models
const Produce = require('../Models/produce');
const Signupkgl = require('../Models/signupkgl');



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


module.exports = router;
