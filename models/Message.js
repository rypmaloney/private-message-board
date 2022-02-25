let mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new Schema({
        title: { type: String, required: true },
        body_text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    })
);

module.exports = Message;
