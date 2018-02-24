var User = require("../database/models/user");
var Car = require("../database/models/car");
var sequelize = require("../database/db");
var co = require('co');
var jwt = require('jsonwebtoken');

var CarController = {

    /**
     * For getting a car.
     * @param req
     * @param res
     */
    get: function  (id_car, res) {

        Car.findOne({
            where: { id_car: id_car }
        })
        .then(function (response) {
            res.status(200).send(response.dataValues);
        })
        .catch(function (error) {
            console.log('Fail find for getting car :', error);
            res.status(500).send("Echec de la récupération de la voiture.");
        });
    },

    /**
     * For updating an car.
     * @param req
     * @param res
     */
    update: function  (req, res) {

        var car = req.body;

        Car.update(car, {where: {id_car: car.id_car}})
            .then(function (response) {
                res.status(200).send("Succès de la mise-à-jour de la voiture.");
            })
            .catch(function (error) {
                console.log('Fail update user :', error);
                res.status(500).send("Echec de la mise-à-jour de la voiture.");
            });

    },

    /**
     * For creating an new car.
     * @param req
     * @param res
     */
    create: function  (req, res) {

        var values = {
            "id_user": req.body.user.id_user,
            "licencePlate": req.body.car.licencePlate,
            "make": req.body.car.make,
            "model": req.body.car.model,
            "capacity":  req.body.car.capacity
        };

        console.log("Values :", values);

        sequelize.query('CALL createCar(:id_user, :licencePlate, :make, :model, :capacity)', {replacements: values} )
            .then(function (response) {
                console.log(response);
                res.status(200).send("Succès de l'ajout de la voiture.");
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send("Echec de l'ajout de la voiture.");
            });
    },

};


module.exports = CarController;