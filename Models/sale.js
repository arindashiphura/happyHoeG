const mongoose = require('mongoose');
const saleSchema = new mongoose.Schema({
    producename: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produce",
    trim: true,
    },
    produceType:{
        type: String,
        trim: true,  // Added trim to remove leading/trailing spaces
    },
    saleTonnage: {
        type: Number, // If you mean weight in tons or kg, this might be better as a Number
        trim: true,
    },
    pricePerTon:{
        type: Number, //
         trim: true, 
    },
    amountPaid: {
        type: Number,  // Changed to Number assuming it represents currency
        trim: true,    
    },
    buyerName: {
        type: String,
        trim: true,
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Signupkgl", // Referencing another model (sales agent)
        trim: true,   
 },
    dateTime: {
        type: Date, // Changed to Date type to store date and time
        default: Date.now  // Automatically set to current date/time if not provided
    },
    storeBranch: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Sale', saleSchema);
