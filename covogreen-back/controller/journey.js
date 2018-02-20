var Journey = require("../database/models/journey");
var co = require('co');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

var JourneyController = {

    /**
     * Cration of a journey
     * @param req
     * @param res
     */
    create: function (req, res) {

        req.accepts('application/json');

        Journey.create({
            origin: req.body.origin,
            destination: req.body.destination,
            seats_available: req.body.seats_available,
            date_journey: req.body.date_journey,
            id_driver: 1
        })
            .then(function (response) {
                res.status(200).send('Trajet ajouté');
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    }
};


module.exports = JourneyController;