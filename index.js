const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

//View engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static
app.use(express.static('public'));

//Database
connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

//Routes
app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
  res.render('index.ejs', {articles: Article.findAll({
    order: [['id', 'DESC']],
    limit: 4
  }).then(articles => {
      Category.findAll().then(categories => {
        res.render('index.ejs', {articles: articles, categories: categories});
      });
    })
  });
});

app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {slug: slug}
  }).then(article => {
    if(article != undefined){
        Category.findAll().then(categories => {
            res.render('article.ejs', {article: article, categories: categories});
        });
    } else {
        res.redirect('/');
    }
  }).catch(err => {
    res.redirect('/');
  });
});

app.listen(8080, (msgError) => {
    if (msgError) {
        console.log('Error: ', msgError);
    } else {
        console.log('Server is running');
    }
});