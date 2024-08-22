const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const registerSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        trim:true,
    },
    branch:{
        type: String,
        trim: true,
    },
    role:{
        type: String,
        trim: true,
    },
    

});
registerSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    });

module.exports = mongoose.model('register', registerSchema);