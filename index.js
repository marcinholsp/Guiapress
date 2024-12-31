const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');

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

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(8080, (msgError) => {
    if (msgError) {
        console.log('Error: ', msgError);
    } else {
        console.log('Server is running');
    }
});