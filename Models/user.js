const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); // Ensure this is required
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: { 
    type: String,
    required: true 
  },
  branch: { 
    type: String, 
    required: true 
  },
  role: {
    type: String, 
    required: true
  }
});

// Apply the passport-local-mongoose plugin to userSchema
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", 
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
