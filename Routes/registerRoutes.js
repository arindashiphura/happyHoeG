const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();



const register = require("../Models/register");
//
router.get("/newuser", (req, res) => {
    res.render("register", {title: "New User"});
});

//add new user
router.post("/newuser", async (req, res) => {
    try{
        const newUser = new register(req.body);
        console.log("print all details from signup",newUser)
        await newUser.save();
        
        res.redirect("/userList");
    }catch(err){
        res.status(400).send("unable to save user in the db");
        console.log("Register user error", err);
    }
    

    
});


// Route to handle login
router.post("/loginkgl", 
    passport.authenticate("local", { failureRedirect: "/loginkgl" }),
    (req, res) => {
        req.session.user = req.user; // Assign session to the logged-in user
        
        // Redirect based on the user's role
        if (req.user.role === "manager") {
            res.redirect("/managerdashboard");
        } else if (req.user.role === "salesagent") {
            // res.redirect("/salesdashboard");
        } else {
            res.send("User with that role does not exist in the system");
        }
    }
);

// // Logout route
// router.get("/logout", (req, res) => {//logout
//     if (req.session) {
//     req.session.destroy((err) => {
//     if (err) {
//     return res.status(500).send("Error logging out");
//     }
//     res.redirect("/loginkgl");
//     });
//     }else{
//         res.send('you donot have a session')
//     }
//     });





    // Get all users from the database
// router.get("/userList", async (req, res) => {
//     try {
//       const users = await User.find().sort({ $natural: -1 }); // Sort users by creation time or other criteria
//       res.render("userList", {
//         title: "User List",
//         users: users
//       });
//     } catch (err) {
//       res.status(400).send("Unable to find users in the database");
//     }
//   });

//   // Get user update form
// router.get("/edit_users/:id", async (req, res) => {
//     try {
//       const user = await User.findOne({ _id: req.params.id });
//       res.render("edit_users", {
//         register: register,
//         title: "Update User"
//       });
//     } catch (err) {
//       res.status(400).send("Unable to find user in the database");
//     }
//   });

//   // Post updated user
// router.post("/edit_users/:id", async (req, res) => {
//     try {
//       await User.findOneAndUpdate({ _id: req.params.id }, req.body);
//       res.redirect("/userList");
//     } catch (err) {
//       res.status(404).send("Unable to update user in the database");
//     }
//   });

//   // Delete user
// router.post("/delete_users", async (req, res) => {
//     try {
//       await User.deleteOne({ _id: req.body.id });
//       res.redirect("back");
//     } catch (err) {
//       res.status(404).send("Unable to delete user in the database");
//     }
//   });
  
  

module.exports = router;