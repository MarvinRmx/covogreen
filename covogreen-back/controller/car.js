var User = require("../database/models/user");
var Car = require("../database/models/car");
var sequelize = require("../database/db");
var co = require('co');
var jwt = require('jsonwebtoken');
var authToken = require("./tools/authToken");

var CarController = {

    /**
     * For getting a car.
     * @param req
     * @param res
     */
    get: function  (req, res) {

        var userToken = authToken.getToken(req);
        var id_car = req.params.id_car;

        if (!userToken.revoked)
        {
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

        }
        else res.status(500).send("Compte bloqué !");
    },

    /**
     * For updating an car.
     * @param req
     * @param res
     */
    update: function  (req, res) {
        var userToken = authToken.getToken(req);
        var car = req.body;

        if (!userToken.revoked)
        {
            Car.update(car, {where: {id_car: car.id_car}})
                .then(function (response) {
                    res.status(200).send("Succès de la mise-à-jour de la voiture.");
                })
                .catch(function (error) {
                    console.log('Fail update user :', error);
                    res.status(500).send("Echec de la mise-à-jour de la voiture.");
                });

        }
        else res.status(500).send("Compte bloqué !");

    },

    /**
     * For deleting an car.
     * @param id_car
     * @param res
     */
    remove: function  (req, res) {

        var userToken = authToken.getToken(req);
        var id_car = req.params.id_car;

        if (!userToken.revoked)
        {
            Car.destroy({where: {id_car: id_car}})
                .then(function (response) {
                    res.status(200).send("Succès de la suppression de la voiture.");
                })
                .catch(function (error) {
                    console.log('Fail update user :', error);
                    res.status(500).send("Echec de la suppression de la voiture.");
                });

        }
        else res.status(500).send("Compte bloqué !");
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

        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            sequelize.query('CALL createCar(:id_user, :licencePlate, :make, :model, :capacity)', {replacements: values} )
                .then(function (response) {
                    console.log(response);
                    res.status(200).send("Succès de l'ajout de la voiture.");
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Echec de l'ajout de la voiture.");
                });

        }
        else res.status(500).send("Compte bloqué !");
    },

};


module.exports = CarController;