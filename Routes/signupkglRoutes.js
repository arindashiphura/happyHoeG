const express = require('express')
const passport = require("passport");
const router = express.Router();

// const sign = require('../Models/signupkgl');
const Signupkgl = require('../Models/signupkgl');

router.get("/addUsers", (req, res) => {
    res.render("signupkgl");
});
// Register admin
router.post("/addUsers", async (req, res) => {
    try {
    // added
    const existingUser = await sign.findOne({ email: req.body.email });// check if the user already exist
    if (existingUser) {
    return res
    .status(400)
    .send("Not registered, a user with a similar email already exists!");
    }
    const user = new sign(req.body);
    // added
    await sign.register(user, req.body.password, (err) => { // used to register a user who will later login
    if (err) {
    throw err;
    }
    res.redirect("/login");
    });
    } catch (err) {
    res.status(400).render("login", { tittle: "Signupkgl" });
    console.log("Signup user error", err);
    }
    });


//login admin page
    router.post("/login/", passport.authenticate("local",{failureRedirect:"/login"}),
     (req, res) => {
        req.session.user = req.user; //assigning asession to a user who has loggedin
        if(req.user.role==="manager"){
            res.redirect("/produceList")
            //res.send)(salesagent dashboard)
        }else{
            res.send("use with the roledoes not exist in the system")
        }
        
        });










        

        //get all users from the db
        router.get('/userList', async (req, res) => {
            try {
                const signupkglItems = await Signupkgl.find().sort({ $natural: -1 }); //this is for sorting the new produce up
                res.render('userList', {
                    title: "user List",
                    signupkgls: signupkglItems,
          
                });
          
            } catch (error) {
                res.status(404).send("Unable to find items in the db");
                // console.log("Error fetching produce", error);
          
            }
          });
          
          
          
          
          
          router.get("/edit_users/:id", async (req, res) => {
              try {
                  const signupkgl = await Signupkgl.findOne({ _id: req.params.id });
                  res.render("edit_users", {
                      title: "edit User",
                      signupkgl: signupkgl,
                  });
              } catch (err) {
                  res.status(400).send("Unable to find item in the database");
              }
          });
          
        
          
        
          
          //delete user
          // delete Produce
          router.post("/delete_users", async (req, res) => {
              try {
              await Signup.deleteOne({ _id: req.body.id });
              res.redirect("back");
              } catch (err) {
              res.status(400).send("Unable to delete item in the database");
              }
              });




       
        
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          // Logout route
          // router.get("/logout", (req, res) => {
          //   if (req.session) {
          //   req.session.destroy((err) => {
          //   if (err) {
          //   return res.status(500).send("Error logging out");
          //   }
          //   res.redirect("/");
          //   });
          //   }
          //   });

module.exports = router;