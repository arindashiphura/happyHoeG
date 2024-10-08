const express = require('express')
const router = express.Router();


router.get("/addUser", (req, res) => {
    res.render("signup");
});
// Register admin
router.post("/addUser", async (req, res) => {
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
    res.status(400).render("login", { tittle: "Signup" });
    console.log("Signup user error", err);
    }
    });

module.exports = router;