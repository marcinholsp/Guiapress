require('dotenv').config();

const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;