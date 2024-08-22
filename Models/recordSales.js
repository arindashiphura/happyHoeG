
// models/produce.js

const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const recordProduceSchema = new mongoose.Schema({
   ProduceName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produce',
        type: String,
        trim: true
    },
    saleTonnage: {
        type: String,
        trim: true
    },
    amountPaid: {
        type: Date,
        trim: true
    },
    buyerName: {
        type: String // Assuming time is stored as a string (e.g., '14:00')
    },
    salesAgentName: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Signupkgl",
        type: Number,
        trim: true
    },
    dateTime: {
        type: Number,
        trim: true
    },
    
    
    storebranch: {
        type: String,
        trim: true
    },
    
});

module.exports = mongoose.model('sales',recordProduceSchema);
