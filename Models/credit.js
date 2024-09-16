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
    type: String,
  },
  amountperkg: {
    type: Number,
  },
  amountDue: {
    type: Number,
  },
  salesAgentName: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Signupkgl", // Referencing another model (sales agent)    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref:"Produce",
    trim: true,
  },
  produceType: {
    type: String,
    trim: true,
  },
  creditTonnage: {
    type: Number,
trim: true,
  },
  dispatchDate: {
    type: Date,
trim: true,
  },
  trusted: { 
    type: Boolean,
    default: false
   }  // Trusted buyer status
});

module.exports = mongoose.model('Credit', creditSchema);
