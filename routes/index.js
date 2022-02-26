var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Private Message Board" });
});

router.get("/log-in/", function (req, res, next) {
    res.send("message board - Log-in!");
});

router.get("/sign-up/", function (req, res, next) {
    res.send("message board - Sign-up!");
});

module.exports = router;
