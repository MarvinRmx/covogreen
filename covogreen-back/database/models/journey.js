var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');

/**
 * @author Marvin RAMEIX
 * Journey entity
 */
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

Journey.belongsTo(User, {foreignKey: "id_driver", onDelete: 'cascade'});

module.exports = Journey;
