var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');

const Journey = db.define('journey',
    {
        id_journey: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        origin:{
            type: Sequelize.STRING
        },
        destination:{
            type: Sequelize.STRING
        },
        seats_available:{
            type: Sequelize.INTEGER
        },
        date_journey:{
            type: Sequelize.DATE
        }
    }
);

Journey.belongsTo(User, {foreignKey: "id_driver"});

module.exports = Journey;
