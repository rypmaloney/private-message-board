var express = require("express");
var router = express.Router();

/* GET message board. */
router.get("/", function (req, res, next) {
    res.send("message board");
});

/* GET individual message detail. */
router.get("/message/", function (req, res, next) {
    res.send("message board - detail");
});

module.exports = router;
