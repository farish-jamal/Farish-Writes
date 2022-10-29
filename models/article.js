const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    imgUrl:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    fullArticle: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model("Article", articleSchema);