const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
var async = require("async");
const { body, validationResult } = require("express-validator");

//models
let User = require("../models/User");
let Message = require("../models/Message");

//POST function for creating a new user- hashes password then saves user
exports.create_user = [
    // Validate and sanitize fields.
    body("username", "Username must not be empty.")
        .isLength({ min: 1 })
        .escape(),
    body("password", "Password must not be empty.")
        .isLength({ min: 1 })
        .escape(),
    body("password-reenter", "Please reenter you're password ")
        .isLength({ min: 1 })
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;

            // If password and confirm password not same
            // don't allow to sign up and throw error
            if (password !== confirmPassword) {
                throw new Error("Passwords must match.");
            }
        })
        .escape(),

    //process request
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render("sign_up_form", {
                title: "Try Again",
                errors: errors.array(),
            });
            return;
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    return next(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        date: new Date(),
                    }).save((err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect("/");
                    });
                }
            });
        }
    },
];

exports.login_user = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in/",
});

exports.log_out = (req, res, next) => {
    req.logout();
    res.redirect("/");
};
