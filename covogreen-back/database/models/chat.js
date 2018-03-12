var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');
var Journey = require('./journey');

const Chat = db.define('chat',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: Sequelize.STRING
        }
    }
);

Chat.belongsTo(User, {foreignKey: "id_auteur"});
Chat.belongsTo(Journey, {foreignKey: "id_trajet"});

module.exports = Chat;
