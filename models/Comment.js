let mongoose = require("mongoose");

const Comment = mongoose.model(
    "Message",
    new Schema({
        body_text: { type: String, required: true },
        parent: { type: Schema.Types.ObjectId, ref: "Message", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        likes: { type: Number, required: false },
    })
);

module.exports = Comment;
