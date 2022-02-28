//packages
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//models
let User = require("./models/User");

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

//Set up local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user)
                return done(null, false, { message: "Incorrect username" });
            bcryptjs.compare(password, user.password, (err, res) => {
                if (err) return done(err);
                // Passwords match, log user in!
                if (res) return done(null, user);
                // Passwords do not match!
                else
                    return done(null, false, { message: "Incorrect password" });
            });
        });
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
);

// Secret value should be a process env value
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Access the user object from anywhere in our application
app.use((req, res, next) => {
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
