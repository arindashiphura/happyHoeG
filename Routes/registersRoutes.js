// const express = require('express');
// const router = express.Router();
// const User = require('../Models/user'); // Adjust path according to your project structure

// // Route to serve the registration page
// router.get('/register', (req, res) => {
//   res.render('register'); // Assumes you are using a view engine like Pug
// });

// // Route to handle registration form submission
// router.post('/register', async (req, res) => {
//   try {
//     // Extract user data from the request body
//     const { username, email, password, confirmPassword, branch, role } = req.body;

//     // Basic validation
//     if (!username || !email || !password || !confirmPassword || !branch || !role) {
//       return res.status(400).send('All fields are required');
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).send('Passwords do not match');
//     }
//     // Create a new user
//     const newUser = new User({
//       username,
//       email,
//       password, // In a real application, hash this password before saving
//       branch,
//       role
//     });

//     // console.log( "this is the data being sent to db",newUser);


    


//     // Save the user to the database
//     await newUser.save();

//     // Redirect or send a success response
//     res.redirect('/login');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
