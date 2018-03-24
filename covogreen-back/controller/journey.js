var Journey = require("../database/models/journey");
var sequelize = require("../database/db");
var authToken = require("./tools/authToken");
var co = require('co');
var jwt = require('jsonwebtoken');

var JourneyController = {

    /**
     * Cration of a journey
     * @param req
     * @param res
     */
    create: function (req, res) {

        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            Journey.create({
                origin: req.body.origin,
                destination: req.body.destination,
                seats_available: req.body.seats_available,
                date_journey: req.body.date_journey,
                id_driver: userToken.id_user
            })
            .then(function (response) {
                res.status(200).send('Trajet ajouté');
            })
            .catch(function (error) {
                console.log('create error : ', error);
                res.status(500).json(error);
            });
        }
        else res.status(500).send("Compte bloqué !");
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
            sequelize.query(' SELECT j.* ' +
                'FROM inscriptionjourneys ij, journeys j ' +
                'WHERE ij.id_trajet = j.id_journey ' +
                'AND ij.id_user = ' + userToken.id_user,
                { model: Journey }
            )
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

    /**
     * For getting all journeys with id_journey.
     * @param req
     * @param res
     */
    getJourneysByID: function (req, res) {

        var id_journey = req.params.id_journey;
        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            Journey.findOne({ where: {id_journey: id_journey} })
                .then(function (response) {
                    res.status(200).send(response);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Echec de la récupération des informations sur le trajet.");
                });
        }
        else res.status(500).send("Compte bloqué !");
    },

    /**
     * Checking if user with this token it's driver for this journey
     * @param req
     * @param res
     */
    isDriverThisJourney: function  (req, res) {

        var userToken = authToken.getToken(req);
        var journeyReq = req.body;

        if(!userToken.revoked)
        {
            Journey.findById(journeyReq.id_journey)
                .then(function (response) {
                    var journeyRes = response;
                    var result = userToken.id_user === journeyRes.id_driver;

                    res.status(200).send(result);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Echec de la vérification de conducteur.");
                });
        }
        else res.status(500).send("Compte bloqué !");
    },

};


module.exports = JourneyController;