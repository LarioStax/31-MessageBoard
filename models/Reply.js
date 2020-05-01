const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    text: String,
    delete_password: String,
    created_on: {
        type: Date,
        default: Date.now
    },
    reported: {
        type: Boolean,
        default: false
    }
});

let Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;