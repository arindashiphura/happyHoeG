const express = require('express');
const passport = require("passport");
const router = express.Router();
const Signupkgl = require('../Models/signupkgl'); // Ensure this is the correct path to your model

// Route to render add users form
router.get("/addUsers", (req, res) => {
    res.render("signupkgl");
});

// Register admin
router.post("/addUsers", async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await Signupkgl.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("Not registered, a user with a similar email already exists!");
        }
        const user = new Signupkgl(req.body);
        
        // Register the new user with Passport's built-in registration method
        await Signupkgl.register(user, req.body.password, (err) => {
            if (err) {
                throw err;
            }
            res.redirect("/login");
        });
    } catch (err) {
        console.log("Signup user error", err);
        res.status(400).render("login", { title: "Signupkgl" });
    }
});

// Login route
router.post("/login", 
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
        req.session.user = req.user; // Assign session to the logged-in user
        
        // Redirect based on the user's role
        if (req.user.role === "manager") {
            res.redirect("/produceList");
        } else if (req.user.role === "sales-agent") {
            res.redirect("/agentsDashboard");
        } else {
            res.send("User with that role does not exist in the system");
        }
    }
);

// Get all users from the database
router.get('/userList', async (req, res) => {
    try {
        const signupkglItems = await Signupkgl.find().sort({ $natural: -1 });
        res.render('userList', {
            title: "User List",
            signupkgls: signupkglItems,
        });
    } catch (error) {
        res.status(404).send("Unable to find items in the database");
    }
});

// Render form to edit a user
router.get("/edit_users/:id", async (req, res) => {
    try {
        const signupkgl = await Signupkgl.findOne({ _id: req.params.id });
        res.render("edit_users", {
            title: "Edit User",
            signupkgl: signupkgl,
        });
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
});

// Update user details
router.post("/edit_users/:id", async (req, res) => {
    try {
        const updatedUser = await Signupkgl.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.redirect("/userList");
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Unable to update user in the database");
    }
});

// Delete user route
router.post("/delete_users", async (req, res) => {
    try {
        await Signupkgl.deleteOne({ _id: req.body.id });
        res.redirect("back");
    } catch (err) {
        res.status(400).send("Unable to delete item from the database");
    }
});

// Logout route
router.get("/logoutkgl", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error logging out");
            }
            res.redirect("/login");
        });
    }
});

module.exports = router;
