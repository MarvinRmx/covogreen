var User = require("../database/models/user");
var Car = require("../database/models/car");
var co = require('co');
var jwt = require('jsonwebtoken');

var CarController = {

    /**
     * For creating an new car.
     * @param req
     * @param res
     */
    create: function  (req, res) {

        Car.create(req.body)
            .then(function (response) {
                res.status(200).send(response);
            })
            .catch(function (error) {
                res.status(500).send(error);
            });
    },

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
};


module.exports = CarController;