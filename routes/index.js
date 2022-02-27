var express = require("express");
var router = express.Router();
let user_controller = require("../controllers/user_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Private Forum" });
});
//GET log in page
router.get("/log-in/", function (req, res, next) {
    res.render("login_form", { title: "Log in " });
});

//GET sign up page
router.get("/sign-up/", function (req, res, next) {
    res.render("sign_up_form", { title: "Sign up", errors: false });
});

//POST new user
router.post("/sign-up/", user_controller.create_user);

module.exports = router;
