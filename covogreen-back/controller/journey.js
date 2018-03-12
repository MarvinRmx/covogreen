var Journey = require("../database/models/journey");
var co = require('co');
var jwt = require('jsonwebtoken');
var authToken = require("./tools/authToken");

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
    },

    /**
     * For getting all journeys with id_user.
     * @param req
     * @param res
     */
    getJourneysByUser: function (req, res) {

        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            Journey.findAll({
                //where: {id_user: userToken.id_user}
                where: {id_driver: userToken.id_user}
            })
            .then(function (response) {
                res.status(200).send(response);
            })
            .catch(function (error) {
                console.log('Fail find for getting journeys by user :', error);
                res.status(500).send("Echec de la récupération du profil.");
            });
        }
        else res.status(500).send("Compte bloqué !");
    },
};


module.exports = JourneyController;