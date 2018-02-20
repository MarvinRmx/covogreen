var User = require("../database/models/user");
var co = require('co');
var jwt = require('jsonwebtoken');

var CarController = {

    /**
     * For creating an new car.
     * @param req
     * @param res
     */
    create: function  (req, res) {

        User.create(req.body)
            .then(function (response) {
                res.status(200).send(response);
            })
            .catch(function (error) {
                res.status(500).send(error);
            });
    }
};


module.exports = CarController;