const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
     trim: true, 
    },
  email: {
     type: String,
       unique: true,
       trim: true, 
 
      },
  password: { 
    type: String,
     trim: true, 
 
    },
  branch: {
     type: String, 
     trim: true, 

     },
  role: { 
    type: String,
     trim: true, 

     },
});

// const user = mongoose.model('User', userSchema);
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  });



module.exports = mongoose.model('user', userSchema);