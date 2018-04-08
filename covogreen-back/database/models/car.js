var db = require('../db.js');
const Sequelize = require('sequelize');

/**
 * @author Marvin RAMEIX
 * Car entity
 */
const Car =  db.define('car',
    {
        id_car: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        licencePlate:{
            type: Sequelize.STRING
        },
        make: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.INTEGER
        }
    }
);

module.exports = Car;