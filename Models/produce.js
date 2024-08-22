// models/produce.js

const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const produceSchema = new mongoose.Schema({
    producename: {
        type: String,
        trim: true
    },
    producetype: {
        type: String,
        trim: true
    },
    dateofpurchase: {
        type: Date,
        trim: true
    },
    timeofpurchase: {
        type: String // Assuming time is stored as a string (e.g., '14:00')
    },
    tonnage: {
        type: Number,
        trim: true
    },
    producecostperkg: {
        type: Number,
        trim: true
    },
    totalcost:{
        type: Number,
        trim: true
    },
    sourceofproduce: {
        type: String,
        trim: true
    },
    dealersname:{
        type: String,
        trim: true
    },
    companyname:{
        type: String,
        trim: true
    },
    storebranch: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    sellingpriceperkg: {
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('Produce', produceSchema);
