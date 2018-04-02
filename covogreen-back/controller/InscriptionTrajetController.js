/**
 * Author: Alex Zarzitski & Marvin RAMEIX
 * Date: 19/02/2018
 */
var Journey = require("../database/models/journey");
var InscriptionTrajet = require("../database/models/inscriptionJourney");
var User = require("../database/models/user");
const Op = require('sequelize').Op;
var co = require('co');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');
var authToken = require("./tools/authToken");


var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');
/**
 * Controleur InscriptionTrajet
 */
var InscriptionTrajetController = {


        /**
         * Exécute la tentative de l'inscription au trajet
         */
        doIt: co.wrap(function* (req, res) {
            req.accepts('application/json');

            var token = req.headers['authorization'];
            if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

            console.log(token);
            /*jwt.verify(token, config.secret, function(err, decoded) {
              if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

              res.status(200).send(decoded);
            });*/

            // var result = RechercheTrajetController.checkRequest(req.body);
            // if(result.success){
            //   var condition = RechercheTrajetController.getResearchCondition(req.body);
            //   result = yield RechercheTrajetController.getListTrajet(req.body, result, condition);
            //   result.nb_total_page = yield RechercheTrajetController.getNbPage(condition);
            // }
            res.send("ok");
        }),

    /**
     * @author Marvin RAMEIX
     * allow an user to rate and comment with date check
     * @param req
     * @param res
     */
    rateAndComment: function (req, res) {
            var userToken = authToken.getToken(req);
            Journey.findOne({
                where: {
                    id_journey: req.params.id_journey,
                    date_journey: {
                        [Op.lt]: new Date()
                    }
                }
            }).then(
                function (trajet) {
                    if (trajet !== null) {
                        InscriptionTrajet.update({
                                rate: req.body.rate,
                                comment: req.body.comment
                            }, {
                                where: {
                                    id_user: userToken.id_user,
                                    id_trajet: trajet.dataValues.id_journey
                                }
                            }
                        );
                        res.status(200).send("La note et commentaire ont bien été pris en compte");
                    }
                    else{
                        res.status(400).send("Aucun trajet terminé n'a été trouvé pour l'utilisateur courant ");
                    }
                }
            ).catch(
                function (reason) {
                    console.log(reason);
                    res.status(400).send("Le trajet correspondant ne peut être noté");
                }
            )
        }
    }
;

module.exports = InscriptionTrajetController;
