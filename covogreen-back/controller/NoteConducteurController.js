/**
 * Author: Alex Zarzitski & Romain Lembo
 * Date: 25/03/2018
 */
var Journey = require("../database/models/journey");
var User = require("../database/models/user");
var InscriptionJourney = require("../database/models/inscriptionJourney");
const Op = require('sequelize').Op;
var co = require('co');
var sequelize = require("../database/db");

var authToken = require("./tools/authToken");


/**
 * Controleur NoteConducteurController
 */
var NoteConducteurController = {

  /**
   * @author Romain Lembo & Alex Zarzitski
   * Cette methode calcule la note moyenne du conducteur
   * @param req Trame envoyée par le client
   * @param res Trame de retour vers le client
   */
  getRateByDriver: function (req, res) {

      var id_driver = req.params.id_driver;
      var userToken = authToken.getToken(req);

      if (!userToken.revoked)
      {

          sequelize.query('SELECT getRateByDriver(:id_driver) AS sum_rate',
              {
                  replacements: { id_driver: id_driver },
                  type: sequelize.QueryTypes.SELECT
              })
              .then(function (response) {
                  res.status(200).send(JSON.stringify(response[0].sum_rate));
              })
              .catch(function (error) {
                  console.log(error);
                  res.status(500).send("Echec de la récupération de la note du conducteur.");
              });
      }
      else res.status(500).send("Compte bloqué !");
  },

};

module.exports = NoteConducteurController;
