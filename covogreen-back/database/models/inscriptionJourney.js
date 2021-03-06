var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');
var Journey = require('./journey');

/**
 * InscriptionJourney entity
 */
const InscriptionJourney = db.define('inscriptionjourney',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rate: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        }
    }
);

InscriptionJourney.belongsTo(User, {foreignKey: "id_user"});
InscriptionJourney.belongsTo(Journey, {foreignKey: "id_trajet"});

module.exports = InscriptionJourney;
