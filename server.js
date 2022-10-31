const express = require('express');
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
var methodOverride = require('method-override')
const app = express()
const port = 3000;

mongoose.connect("mongodb://localhost:27017/myBlog");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    let article = await Article.find().sort({createdAt: "desc"});
    res.render("index", {article: article});
})

app.use("/articles", articleRouter);

app.listen(port, ()=> {
    console.log("Connection at" + port);
});