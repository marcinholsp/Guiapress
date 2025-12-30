const express = require('express');
const Article = require('./Article');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.send('Articles page');
});

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new');
});

router.post('/articles/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    if (title != undefined && body != undefined) {
        Article.create({
            title: title,
            body: body
        }).then(() => {
            res.redirect('/admin/articles');
        });
    }
});

module.exports = router;