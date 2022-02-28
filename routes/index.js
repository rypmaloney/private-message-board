var express = require("express");
var router = express.Router();
let user_controller = require("../controllers/user_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log(res.user);
    res.render("index", {
        title: "Private Forum",
        // currentUser: req.user,
    });
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

//POST login user
router.post("/log-in/", user_controller.login_user);

//POST new user
router.post("/log-out/", user_controller.log_out);

module.exports = router;
