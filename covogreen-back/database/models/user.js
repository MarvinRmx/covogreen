var db = require('../db.js');
const Sequelize = require('sequelize');
var Car = require('./car');

/**
 * @author Marvin RAMEIX & Romain Lembo
 * User entity.
 */
const User = db.define('user',
    {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        cp: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        privilege: {
            type: Sequelize.INTEGER
        },
        is_driver: {
            type: Sequelize.BOOLEAN
        },
        revoked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }
);

User.belongsTo(Car, {foreignKey: "id_car"});

module.exports = User;