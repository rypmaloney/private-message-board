let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: "Message", required: true },
    body_text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    likes: { type: Number, required: false },
});

commentSchema.virtual("prettyDate").get(function () {
    return this.date.toDateString();
});

module.exports = mongoose.model("Comment", commentSchema);
