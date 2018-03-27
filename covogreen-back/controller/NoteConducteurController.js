/**
 * Author: Alex Zarzitski & Romain Lembo
 * Date: 25/03/2018
 */
var Journey = require("../database/models/journey");
var sequelize = require("../database/db");

var authToken = require("./tools/authToken");


/**
 * Controleur NoteConducteurController
 */
var NoteConducteurController = {

  /**
   * Cette methode calcule la note moyenne du conducteur
   * @param req Trame envoyée par le client
   * @param res Trame de retour vers le client
   */
  getRateByDriver: function (req, res) {

      var id_driver = req.params.id_driver;
      var userToken = authToken.getToken(req);
      var id_journey = 0;

      if (!userToken.revoked)
      {
          Journey.findOne({ where: { id_driver: id_driver }})
              .then(function (response) {
                  id_journey = response.dataValues.id_journey;

                  sequelize.query('SELECT SUM(rate)/COUNT(*) as sum_rate FROM inscriptionjourneys WHERE id_trajet = :id_journey AND rate != 0',
                      { replacements: { id_journey: id_journey }, type: sequelize.QueryTypes.SELECT })
                      .then(function (response) {
                          res.status(200).send(JSON.stringify(response[0].sum_rate));
                      })
                      .catch(function (error) {
                          console.log(error);
                          res.status(500).send("Echec de la récupération de la note du conducteur.");
                      });
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
