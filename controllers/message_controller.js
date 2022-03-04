const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
var async = require("async");
const { body, validationResult } = require("express-validator");

let User = require("../models/User");
let Message = require("../models/Message");
let Comment = require("../models/Comment");
const { isValidObjectId } = require("mongoose");

//GET Function for all messages
exports.message_list = function (req, res, next) {
    Message.find({}, "title body_text user _id likes date")
        .sort({ likes: -1 })
        .populate("user")
        .exec(function (err, message_list) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("message_board", {
                title: "Message Board",
                list_message: message_list,
            });
        });
};

//GET Function for all comments for a given post
exports.comment_list = function (req, res, next) {
    async.parallel(
        {
            comments: function (callback) {
                Comment.find({ parent: req.params.id })
                    .populate("user")
                    .exec(callback);
            },
            message: function (callback) {
                Message.findById(req.params.id).populate("user").exec(callback);
            },
        },
        function (err, results) {
            console.log(results.message);
            if (err) {
                return next(err);
            }
            if (results.message == null) {
                // No results.
                var err = new Error("There is no post");
                err.status = 404;
                return next(err);
            }
            res.render("message_detail", {
                title: results.message.title,
                comment_list: results.comments,
                message: results.message,
                errors: false,
            });
        }
    );
};

//POST Function for new message
exports.message_create_post = [
    // Validate and sanitize fields.
    body("title", "Title must not be empty.").isLength({ min: 1 }),
    body("body", "The actually post is required, buddy")
        .trim()
        .isLength({ min: 1 }),

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
            likes: 0,
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

//POST function to create specific comment
exports.comment_create_post = [
    // Validate and sanitize fields.
    body("comment", "The actually post is required, buddy")
        .trim()
        .isLength({ min: 1 }),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a message object with escaped and trimmed data.
        var comment = new Comment({
            parent: req.params.id,
            body_text: req.body.comment,
            date: new Date(),
            user: req.user,
        });

        if (!errors.isEmpty()) {
            Message.findById(req.params.id)
                .populate("user")
                .exec(function (err, message) {
                    if (err) {
                        return next(err);
                    }
                    //Successful, so render
                    res.render("message_detail", {
                        title: message.title,
                        message: message,
                        errors: errors.array(),
                    });
                    return;
                });
        } else {
            // Data from form is valid. Save item.
            comment.save(function (err) {
                if (err) {
                    return next(err);
                }
                //successful - redirect to new item record.
                res.redirect(`/board/message/${req.params.id}`);
            });
        }
    },
];

//GET function to display specific post
exports.message_detail = function (req, res, next) {
    Message.findById(req.params.id)
        .populate("user")
        .exec(function (err, message) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("message_detail", {
                title: message.title,
                message: message,
                errors: false,
            });
        });
};

//GET function for all messsages by the current user
exports.current_user_list = function (req, res, next) {
    Message.find({ user: req.user }, "title body_text user likes")
        .sort({ likes: -1 })
        .populate("user")
        .exec(function (err, message_list) {
            if (err) {
                return next(err);
            }
            let user = req.user;
            //Successful, so render
            res.render("message_board", {
                title: `Posts by You`,
                list_message: message_list,
            });
        });
};

//GET function for all messsages by a given  user
exports.user_list = function (req, res, next) {
    async.parallel(
        {
            messages: function (callback) {
                Message.find({ user: req.params.id })
                    .sort({ likes: -1 })
                    .populate("user")
                    .exec(callback);
            },
            user: function (callback) {
                User.findById(req.params.id).exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.messages == null) {
                // No results.

                var err = new Error("There are no posts by this user");
                err.status = 404;
                return next(err);
            }
            res.render("message_board", {
                title: `Posts by ${results.user.username}`,
                list_message: results.messages,
            });
        }
    );
};

//Increment like for a given post. This is called on the front end through AJAX.
exports.like_increment = function (req, res, next) {
    Message.updateOne(
        { _id: req.params.id },
        { $inc: { likes: 1 } },
        function (err, resp) {
            console.log(err);
        }
    );
};
