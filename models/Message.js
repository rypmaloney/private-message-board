let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Message = mongoose.model(
    "Message",
    new Schema({
        title: { type: String, required: true },
        body_text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, required: true },
        likes: { type: Number, required: false },
    })
);

// Virtual for messages's URL
// MessageSchema.virtual("url").get(function () {
//     return "/board/message/" + this._id;
// });

module.exports = Message;
