const mongoose = require("mongoose")

const Files = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    orginalname: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0 
    }
})

module.exports = mongoose.model("File", Files)