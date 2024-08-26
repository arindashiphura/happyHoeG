const express = require('express');
const passport = require('passport'); // Ensure you require passport
const router = express.Router();



// Route for the welcome page (GET request)
router.get('/', (req, res) => {
    res.render('welcome');  // Render 'welcome.pug'
});

router.get('/homepage', (req, res) => {
    res.render('homepage');  // Render 'welcome.pug'
});



module.exports = router;