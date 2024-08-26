const express = require('express')
const passport = require("passport");
const router = express.Router();

const sign = require('../Models/signupkgl')

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
    res.redirect("/loginkgl");
    });
    } catch (err) {
    res.status(400).render("signupkgl", { tittle: "Signupkgl" });
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










        

        // router.get('/userlist', async (req, res) => {
        //     try {
        //         const signupItems = await Signup.find().sort({ $natural: -1 }); //this is for sorting the new produce up
        //         res.render('userlist', {
        //             title: "user List",
        //             signups: signupItems,
          
        //         });
          
        //     } catch (error) {
        //         res.status(404).send("Unable to find items in the db");
        //         // console.log("Error fetching produce", error);
          
        //     }
        //   });
          
          
          
          
          
        //   // get produce update form
        //   router.get("/edituser/:id", async (req, res) => {
        //       try {
        //           const item = await Signup.findOne({ _id: req.params.id });
        //           res.render("userList", {
        //               title: "edit User",
        //               signup: item,
        //           });
        //       } catch (err) {
        //           res.status(400).send("Unable to find item in the database");
        //       }
        //   });
          
        //   router.get("/edituser/:id", async (req, res) => {
        //       try {
        //           const item = await Signup.findOne({ _id: req.params.id })
        //           res.render("edit_users", {
        //               signup: item,
        //               title: "Update Produce",
        //           })
        //       } catch(error) {
        //           res.status(400).send("Unable to find item in the database");
        //       }
              
              
        //   });
          
          
        //   // post updated produce
        //   router.post("/edituser", async (req, res) => {
        //       try {
        //           await Signup.findOneAndUpdate({ _id: req.query.id }, req.body);
        //           res.redirect("/userlist");
        //       } catch (err) {
        //           res.status(404).send("Unable to update item in the database");
        //       }
        //   });
          
        //   //delete user
        //   // delete Produce
        //   router.post("/delete_users", async (req, res) => {
        //       try {
        //       await Signup.deleteOne({ _id: req.body.id });
        //       res.redirect("back");
        //       } catch (err) {
        //       res.status(400).send("Unable to delete item in the database");
        //       }
        //       });




        //       //router to get all users from the database

        //       router.get('/allUsers', async (req, res) => {
        //         try {
        //             const users = await User.find(); // Fetch all users from the database
        //             res.render('allUsers', { users }); // Render the Pug template with users data
        //         } catch (err) {
        //             res.status(400).send('Error retrieving users');
        //         }
        //     });
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
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