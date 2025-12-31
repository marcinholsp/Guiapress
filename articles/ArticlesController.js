const express = require('express');
const Article = require('./Article');
const Category = require('../categories/Category');
const slugify = require('slugify');
const router = express.Router();

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/index', {articles: articles});
    });
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories});
    });
});

router.post('/articles/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    if (title != undefined && body != undefined) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: req.body.category
        }).then(() => {
            res.redirect('/admin/articles');
        });
    }
});

module.exports = router;