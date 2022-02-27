let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        date: { type: Date, required: true },
    })
);

module.exports = User;
