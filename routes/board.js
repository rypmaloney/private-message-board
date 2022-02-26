var express = require("express");
var router = express.Router();

/* GET message board. */
router.get("/", function (req, res, next) {
    res.render("message_board", { title: "Messages" });
});

/* GET individual message detail. */
router.get("/message/", function (req, res, next) {
    res.render("message_detail", { title: "Message" });
});

router.get("/message/new/", function (req, res, next) {
    res.render("new_message", { title: "New Message" });
});

module.exports = router;
