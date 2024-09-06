const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();

// Route to render the login page
router.get("/login", (req, res) => {
    res.render("login");
});


// Route to handle login





    // router.get("/logoutkgl", (req, res) => {
    //     req.logout((err) => {
    //       if (err) { return next(err); }
    //       req.session.destroy((err) => {
    //         if (err) {
    //           return res.status(400).send("Unable to log out, please try again.");
    //         }
    //         res.redirect("/logoutkgl"); // Redirect to login page after logout
    //       });
    //     });
    //   });

module.exports = router;