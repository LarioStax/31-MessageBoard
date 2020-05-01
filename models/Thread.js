const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
    board: String,
    text: String,
    delete_password: String,
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply"
    }],
    created_on: {
        type: Date,
        default: Date.now
    },
    bumped_on: {
        type: Date,
        default: Date.now
    },
    reported: {
        type: Boolean,
        default: false
    }
});

let Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;