var express = require("express");
var router = express.Router();

/* GET message board. */
router.get("/", function (req, res, next) {
    res.send("message board");
});

module.exports = router;
