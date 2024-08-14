// dependence
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");




//added

const passport = require("passport");
const expressSession = require("express-session")({
secret: "secret",
resave: false,//donot save their session after login
saveUninitialized: false//the session didnot start donot save
});

require("dotenv").config();

const Signup = require('./Models/signup');

//import models
//importing routes
const signupRoutes = require("./Routes/signupRoutes"); // import routes
const loginRoutes = require("./Routes/loginRoutes"); // import routes
const registerRoutes = require("./Routes/registerRoutes"); // import routes





//instantiation
const app = express();
const port = 4000;




//configuration
// set db connection to mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
  
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });




//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specify the views directory




//midleware

app.use(express.static(path.join(__dirname, "public"))); // spesfy a folder for static files
app.use(express.urlencoded({ extended: true })); //helps us to parse form data
app.use(express.json()); //helps to capture data in jason format





//added
// express session configs
app.use(expressSession);// express session
app.use(passport.initialize());//intialize passport
app.use(passport.session());//use passport session

// passport configs
passport.use(Signup.createStrategy());// use the local strategy
passport.serializeUser(Signup.serializeUser());// assign a serial number to a user in the system
passport.deserializeUser(Signup.deserializeUser());// the serial number is destroyed on log out




//routes
//use routes/ use imported routes

app.use("/", signupRoutes); // add signup route here
app.use("/", loginRoutes);
app.use("/", registerRoutes);

// app.use("/", registerRoutes);




app.get("*", (req, res) => {
  res.send("error! page does not exist");
});



//Bootstrapping the server
app.listen(port, () => console.log(`listening on port ${port}`));
