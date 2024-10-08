const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();



// Route for the welcome page (GET request)
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));  // Serve 'index.html'
});


router.get('/homepage', (req, res) => {
    res.render('homepage');  // Render 'welcome.pug'
});






// router.get('/branch', (req, res) => {
//     res.render('branch');  // Render 'report
// });
module.exports = router;