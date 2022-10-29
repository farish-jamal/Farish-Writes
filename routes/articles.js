const express = require("express");
const article = require("../models/article");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res)=>{
    res.render("articles/new")
})

router.get("/:id", async(req,res)=>{
    let article = await Article.findById(req.params.id);
    if(article == null) res.redirect("/");
    res.render("articles/post", {article: article});
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

module.exports = router;
