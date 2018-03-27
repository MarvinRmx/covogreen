var db = require('../db.js');
const Sequelize = require('sequelize');
var User = require('./user');
var Journey = require('./journey');

const InscriptionJourney = db.define('inscriptionjourney',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rate: {
            type: Sequelize.INTEGER
        }
    }
);

InscriptionJourney.belongsTo(User, {foreignKey: "id_user"});
InscriptionJourney.belongsTo(Journey, {foreignKey: "id_trajet"});

module.exports = InscriptionJourney;
