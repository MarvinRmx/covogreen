
const Sequelize = require('sequelize');

const DB_NAME = 'covogreen';
const USERNAME = 'root';
const PASSWORD = '';
const HOST = 'localhost';
const DIALECT = 'mysql';

const database = new Sequelize(
    DB_NAME,
    USERNAME,
    PASSWORD,
    {
        host: HOST,
        dialect: DIALECT,
        operatorsAliases: false
    }
);
module.exports = database;
