const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        trim:true,
    },
    

});
signupSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    });

module.exports = mongoose.model('Signup', signupSchema);