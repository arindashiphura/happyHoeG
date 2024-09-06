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
  salesAgentName: {
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
  produceName: {
    type: String,
    trim: true,
  },
  produceType: {
    type: String,
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
