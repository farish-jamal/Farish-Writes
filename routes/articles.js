const express = require("express");
const article = require("../models/article");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res)=>{
    res.render("articles/new", {article: article})
})

router.get("/:id", async(req,res)=>{
    let article = await Article.findById(req.params.id);
    if(article == null) res.redirect("/");
    res.render("articles/post", {article: article});
})

router.get("/edit/:id", async(req,res)=>{
    let article = await Article.findById(req.params.id);
    res.render("articles/edit", {article: article});
})

router.post("/", async(req, res)=>{
    let article = new Article({
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        description: req.body.description,
        fullArticle: req.body.fullArticle,
    })

    try {
        article = await article.save();
        res.redirect(`articles/${article.id}`);
    } catch (error) {
        res.render("articles/new");
    }
})

router.put("/:id", async(req, res)=>{
    let article = await Article.findById(req.params.id);
    console.log(article);
    article.imgUrl = req.body.imgUrl
    article.title = req.body.title
    article.description = req.body.description
    article.fullArticle = req.body.fullArticle
    try {
        article = await article.save();
        // console.log(article);
        res.redirect(`/articles/${article.id}`);
    } catch (error) {
        res.render("articles/edit", {article: article});
    }
    // console.log(article);
})

router.delete("/:id", async(req, res)=>{
    let article = await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
})
module.exports = router;
