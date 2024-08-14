const express = require("express");
const router = express.Router();
const Crop = require("../models/crop");
router.get("/", (req, res) => {
    // new
    res.send("Homepage! Hello world.");
  });
  
  //route for about page
  router.get("/about", (req, res) => {
    res.send("Happy Hoe Grocery. KGL Busuness.");
  });
  

  router.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();
  });
  
  //Simple request time logger for a specific route
  router.use("/about", (req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();
  });
  router.get("/member", (req, res) => {
    res.send("These are member details");
  });
  //use postman to test the following routes
  router.post("/addmember", (req, res) => {
    res.send("You have added a member");
  });
  

  //rendering a view
  router.get("/first", (req, res) => {
    res.render("index");
  });

  router.post("/first", (req, res) => {
    console.log(req.body);
    });
  
  
  //when we are going to post data we should have to routes. get and post
  router.get("/quotes", (req, res) => {
    res.sendFile(__dirname + "/Views/quotes.html");
  });
  
  router.post("/quotes", (req, res) => {
    console.log(req.body);
  });

  router.get("/crops", (req, res) => {
    res.render("crops");
  });
  
  router.post("/crops", (req, res) => {
    console.log(req.body);
    res.json( req.body );
  });


  router.get("/login", (req, res) => {
    res.render("login");
  });
  
  router.post("/login", (req, res) => {
    console.log(req.body);
    res.json( req.body );
  });

  // router.get("/cropreg", (req, res) => {
  //   res.render("cropreg");
  // });
  
  // router.post("/cropreg", (req, res) => {
  //   console.log(req.body);
  //   res.json( req.body );
  // });

  router.get("/cropreg", (req, res) => {
    res.render("cropreg");
  });
  
  router.post("/cropreg", (req, res) => {
   const newCrop = new Crop(req.body);
    newCrop.save()
    res.redirect("/crops")
  });



  

   module.exports = router;