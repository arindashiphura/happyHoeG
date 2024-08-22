const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();

// Route to render the login page
router.get("/loginkgl", (req, res) => {
    res.render("loginkgl");
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
            res.redirect("/salesdashboard");
        } else {
            res.send("User with that role does not exist in the system");
        }
    }
);




    // router.get("/logoutkgl", (req, res) => {
    //     req.logout((err) => {
    //       if (err) { return next(err); }
    //       req.session.destroy((err) => {
    //         if (err) {
    //           return res.status(400).send("Unable to log out, please try again.");
    //         }
    //         res.redirect("/loginkgl"); // Redirect to login page after logout
    //       });
    //     });
    //   });
module.exports = router;