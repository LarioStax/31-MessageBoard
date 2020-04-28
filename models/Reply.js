const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    text: String,
    delete_password: String,
    created_on: {
        Type: Date,
        default: new Date.now
    },
    reported: {
        Type: Boolean,
        default: false
    }
});

let Reply = mongoose.model("Reply", threadSchema);

module.exports = Thread;