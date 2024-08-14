// this helps express server to run
//Dependence
const express = require("express");
const path = require("path");

//instation of express
const app = express();

//configuration
const studyRoutes = require("./Routes/studyRoutes"); // import routes

//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specify the views directory

//middleware
app.use(express.urlencoded({ extended: true }));





//routes
//use routes/ use imported routes
app.use("/", studyRoutes);

//endpoint to not existing route, it must be put after
//all endpoints or else it will not run
app.get("*", (req, res) => {
  res.send("error! page does not exist");
});

//Bootstrapping the server
app.listen(3000, () => console.log("listening on port 3000")); // new
