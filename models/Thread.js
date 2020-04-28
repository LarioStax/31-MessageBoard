const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
    board: String,
    text: String,
    delete_password: String,
    replies: [],
    created_on: {
        Type: Date,
        default: new Date.now
    },
    bumped_on: {
        Type: Date,
        default: new Date.now
    },
    reported: {
        Type: Boolean,
        default: false
    }
});

let Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;