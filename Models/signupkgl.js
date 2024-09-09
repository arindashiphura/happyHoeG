const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const signupkglSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,  // Use 'String' with an uppercase 'S'
        trim: true,
        unique: true,
    },
    role:{
        type: String,
        trim:true,
    },
    branch:{
        type: String,
        trim:true,
    }
    
});
signupkglSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    });

module.exports = mongoose.model('Signupkgl', signupkglSchema);