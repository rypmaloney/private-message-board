//packages
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();

//authenitcation packages

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

//define routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var boardRouter = require("./routes/board");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Set up Passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//MongoDB connection
const mongoDb = `${process.env.DB_URI}`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//PASSPORT Middleware
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (user.password !== password) {
                //use bycrpt to compare hashed password
                bcryptjs.compare(password, user.password, (err, res) => {
                    if (res) {
                        // passwords match! log user in
                        return done(null, user);
                    } else {
                        // passwords do not match!
                        return done(null, false, {
                            message: "Incorrect password",
                        });
                    }
                });
            }
            return done(null, user);
        });
    })
);

//Creates and checks for cookie in User in database
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Custom middleware. Creates variable on "locals object". Sets it to current user.
//IF you set this middleware between here you will ahve access to the variable "currentUser in all views"
//where you instantiate passport middlware
//and
//before you render views
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Use previously defined routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
