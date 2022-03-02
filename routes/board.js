var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/message_controller");

/* GET message board. */
router.get("/", message_controller.message_list);

router.get("/message/new/", function (req, res, next) {
    res.render("new_message", { title: "New Message", errors: false });
});

router.post("/message/like/:id", message_controller.like_increment);

//Get specific message
router.get("/message/user/", message_controller.user_list);

//Get specific message
router.get("/message/:id/", message_controller.comment_list);

router.post("/message/new/", message_controller.message_create_post);

router.post("/message/:id/", message_controller.comment_create_post);

module.exports = router;
