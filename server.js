const express = require('express');
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const app = express()

mongoose.connect("mongodb+srv://farishjamal:farishjamal1234@cluster0.2otv6pq.mongodb.net/?retryWrites=true&w=majority");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));

app.get('/', async(req, res) => {
    let article = await Article.find().sort({createdAt: "desc"});
    res.render("index", {article: article});
})

app.use("/articles", articleRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port");
})