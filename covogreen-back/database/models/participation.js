var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');
var Journey = require('./journey');

/**
 * @author Marvin RAMEIX
 * Participation entity
 */
const Participation = db.define('participation',
    {
        id_participation: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        }
    }
);

Participation.belongsTo(User, {foreignKey: "id_driver"});
Participation.belongsTo(Journey, {foreignKey: "id_journey"});

module.exports = Participation;
