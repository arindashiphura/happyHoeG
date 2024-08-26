const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    trim: true,
  },
  nationalId: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  contacts: {
    type: String,
  },
  amountDue: {
    type: Number,
  },
  salesAgent: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
     trim: true,
  },
  branch:{
    type: String,
    trim: true,
  },
  producename: {
    type: String,
    trim: true,
  },
  producetype: {
    type: String,
    required: true,
    trim: true,
  },
  tonnage: {
    type: Number,
trim: true,
  },
  dispatchDate: {
    type: Date,
trim: true,
  }
});

module.exports = mongoose.model('Credit', creditSchema);
