var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Private Forum" });
});

router.get("/log-in/", function (req, res, next) {
    res.render("login_form", { title: "Log in " });
});

router.get("/sign-up/", function (req, res, next) {
    res.render("sign_up_form", { title: "Sign up" });
});

module.exports = router;
