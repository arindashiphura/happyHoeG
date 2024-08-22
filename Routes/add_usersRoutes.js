const express = require('express');
const passport = require("passport");
const router = express.Router();
const User = require('../Models/signupkgl'); // Adjust path as needed

// Route to get all users
router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('allUsers', { users }); // Render the Pug template with users data
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
});

module.exports = router;
