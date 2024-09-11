const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');




const Produce = require('../Models/produce');





// Reports route
router.get("/reports", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    req.session.user = req.user;
    try {
        // Instantiate a crop variable to select a crop, or default to an empty string
        let selectedProduce = req.query.searchProduce || '';

        // Query for returning all tonnage and revenue of a produce
        let items = await Produce.find({ producename: selectedProduce });

        // Aggregate data for cereals
        let totalCereals = await Produce.aggregate([
            { $match: { producetype: 'cereal' } },
            { $group: {
                _id: null,
                stockQuantity: { $sum: "$tonnage" },
                totalExpense: { $sum: "$totalcost" },
                totalProjectedRevenue: { $sum: { $multiply: ["$sellingpriceperkg", "$tonnage"] } }
            }}
        ]);

        // Aggregate data for legumes
        let totalLegumes = await Produce.aggregate([
            { $match: { producetype: 'legume' } },
            { $group: {
                _id: null,
                stockQuantity: { $sum: "$tonnage" },
                totalExpense: { $sum: "$totalcost" },
                totalProjectedRevenue: { $sum: { $multiply: ["$sellingpriceperkg", "$tonnage"] } }
            }}
        ]);

        // Aggregate data for the selected crop (only if a crop is selected)
        let totalCrop = [];
        if (selectedProduce) {
            totalCrop = await Produce.aggregate([
                { $match: { producename: selectedProduce } },
                { $group: {
                    _id: "$producename",
                    stockQuantity: { $sum: "$tonnage" },
                    totalExpense: { $sum: "$totalcost" },
                    totalProjectedRevenue: { $sum: { $multiply: ["$sellingpriceperkg", "$tonnage"] } }
                }}
            ]);
        }

        // Provide default values if no data is returned
        const defaultData = {
            stockQuantity: 0,
            totalExpense: 0,
            totalProjectedRevenue: 0
        };

        res.render("reports", {
            title: 'Reports',
            produces: items,
            totalcereals: totalCereals[0] || defaultData,
            totallegumes: totalLegumes[0] || defaultData,
            totalcrop: totalCrop[0] || defaultData, // If no crop is selected or found, return default values
        });
    } catch (error) {
        res.status(400).send("Unable to find items in the database");
        console.log(error.message); // Log the specific error message for easier debugging
    }
});








module.exports = router;
