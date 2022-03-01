var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/message_controller");

/* GET message board. */
router.get("/", message_controller.message_list);

/* GET individual message detail. */
router.get("/message/", function (req, res, next) {
    res.render("message_detail", { title: "Message" });
});

router.get("/message/new/", function (req, res, next) {
    res.render("new_message", { title: "New Message", errors: false });
});

router.post("/message/new/", message_controller.message_create_post);

module.exports = router;
