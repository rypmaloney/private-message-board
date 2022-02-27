let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Message = mongoose.model(
    "Message",
    new Schema({
        title: { type: String, required: true },
        body_text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        likes: { type: Number, required: false },
    })
);

module.exports = Message;
