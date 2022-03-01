const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
var async = require("async");
const { body, validationResult } = require("express-validator");

let User = require("../models/User");
let Message = require("../models/Message");

//GET Function for all messages
exports.message_list = function (req, res, next) {
    Message.find({}, "title body_text user")
        .sort({ title: 1 })
        .populate("user")
        .exec(function (err, message_list) {
            if (err) {
                return next(err);
            }
            console.log(message_list);
            //Successful, so render
            res.render("message_board", {
                title: "Private Forum",
                list_message: message_list,
            });
        });
};

//GET Function for specific message by ID

//POST Function for new message
exports.message_create_post = [
    // Validate and sanitize fields.
    body("title", "Title must not be empty.").isLength({ min: 1 }).escape(),
    body("body", "The actually post is required, buddy")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a message object with escaped and trimmed data.
        var message = new Message({
            title: req.body.title,
            body_text: req.body.body,
            date: new Date(),
            user: req.user,
        });

        if (!errors.isEmpty()) {
            //Successful, so render
            res.render("new_message", {
                title: "New Post",
                message: message,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid. Save item.
            message.save(function (err) {
                if (err) {
                    return next(err);
                }
                //successful - redirect to new item record.
                res.redirect("/board/");
            });
        }
    },
];
