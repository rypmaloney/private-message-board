let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    title: { type: String, required: true },
    body_text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    likes: { type: Number, required: false },
});
//Virtual for messages's URL
messageSchema.virtual("url").get(function () {
    return "/board/message/" + this._id;
});

messageSchema.virtual("prettyDate").get(function () {
    return this.date.toDateString();
});

module.exports = mongoose.model("Message", messageSchema);
