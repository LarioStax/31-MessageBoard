const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    board: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }]
});

module.exports = mongoose.model("Board", boardSchema);