var Journey = require("../database/models/journey");
var InscriptionTrajet = require("../database/models/inscriptionJourney");
var sequelize = require("../database/db");
var authToken = require("./tools/authToken");
var co = require('co');
var jwt = require('jsonwebtoken');

var JourneyController = {

    /**
     * @author Marvin RAMEIX
     * Cration of a journey
     * @param req
     * @param res
     */
    create: function (req, res) {

        var userToken = authToken.getToken(req);

        if (!userToken.revoked) {
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
        var signe = "";
        if (req.params.signe == 'sup')
            signe = ">=";
        else if (req.params.signe == 'inf')
            signe = "<";
        if (!userToken.revoked) {
            sequelize.query(' SELECT j.* ' +
                'FROM inscriptionjourneys ij, journeys j ' +
                'WHERE ij.id_trajet = j.id_journey ' +
                'AND ij.id_user = ' + userToken.id_user +
                ' AND j.date_journey > SYSDATE()' +
                ' UNION SELECT * FROM journeys j WHERE id_driver = ' + userToken.id_user +
                ' AND j.date_journey' + signe + 'SYSDATE()'
                ,
                {model: Journey}
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
     * @author Marvin RAMEIX
     * Getting info of the Journey from the id used in the url
     * @param req
     * @param res
     */
    getJourney: function (req, res) {
        Journey.findById(req.params.id_journey)
            .then(function (response) {
                res.status(200).send(response);
            }).catch(function (error) {
            console.log(error);
            res.status(500).send("Aucun trajet correspondant.");
        });
    },

    /**
     * Checking if user with this token it's driver for this journey
     * @param req
     * @param res
     */
    isDriverThisJourney: function (req, res) {

        var userToken = authToken.getToken(req);
        var journeyReq = req.body;

        if (!userToken.revoked) {
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

    /**
     * @author Marvin RAMEIX
     * Deleting journey by id with author check
     * @param req
     * @param res
     */
    delete: function (req, res) {
        var userToken = authToken.getToken(req);
        Journey.findById(req.params.id_journey)
            .then(function (response) {
                if (userToken.id_user == response.dataValues.id_driver) {
                    Journey.destroy({
                        where: {
                            id_journey: response.dataValues.id_journey
                        }
                    }).then(function (resp) {
                        res.status(200).send("Trajet supprimé");
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send("Auteur non conducteur.");
                    });
                }
            }).catch(function (error) {
            console.log(error);
            res.status(500).send("Trajet non trouvé.");
        });
    },

    /**
     * @author Marvin RAMEIX
     * Allow to know if the user connected can rate and comment the current journey
     * @param req
     * @param res
     */
    canRateAndComment: function (req, res) {
        var userToken = authToken.getToken(req);
        InscriptionTrajet.findOne({
            where: {
                id_trajet: req.params.id_journey,
                id_user: userToken.id_user
            }
        }).then(
            function (value) {
                if(value !== null){
                    res.status(200).send(true);
                }
                else{
                    res.status(200).send(false);
                }
            }
        ).catch(
            function (reason) {
                console.log(reason);
                res.status(500).send("Cet utilisateur ne participe pas au trajet");
            }
        )
    }
};


module.exports = JourneyController;