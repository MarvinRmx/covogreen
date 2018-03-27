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
   * Cette methode calcule la note moyenne du conducteur
   * @param req Trame envoyée par le client
   * @param res Trame de retour vers le client
   */
  getJourneysByID: function (req, res) {

      var id_driver = req.params.id_driver;
      var userToken = authToken.getToken(req);

      if (!userToken.revoked)
      {
          sequelize.query('SELECT getRateByDriver('+ id_driver +')')
              .then(function (response) {

                    var result = 0;
                    for (var key in response[0][0]) {
                        result = response[0][0][key];
                        res.status(200).send(JSON.stringify(result));
                    }
              })
              .catch(function (error) {
                  console.log(error);
                  res.status(500).send("Echec de la récupération de la note du conducteur.");
              });
      }
      else res.status(500).send("Compte bloqué !");
  },

  /*
  doIt: co.wrap(function * (req, res) {
    req.accepts('application/json');
    // On décode le json
    var token = authToken.getToken(req);
    if(token.revoked)
      res.status(200).send({success: false, message: ["Error Token"]});

    var user = yield User.findById(parseInt(req.params.id_driver));

    if(user != null){
        var driverRate = 0;
        var nbVotes = 0;
        var sum = 0;
        var condition = { 'where' : { [Op.and] : [{"id_driver" : user.id_user}] } };
        var journeyList = yield Journey.find(condition);
        if(journeyList != null){
          for (i = 0; i < journeyList.length; i++) {
            var condition = { 'where' : { [Op.and] : [{"id_journey" : journeyList[i].id_journey}] } };
            var inscriptionJourneyList = yield InscriptionJourney.find(condition);
            if(inscriptionJourneyList != null){
              for (j = 0; j < inscriptionJourneyList.length; j++) {
                if(inscriptionJourneyList[j].rate != 0){
                  nbVotes++;
                  sum += inscriptionJourneyList[j].rate;
                }
              }
            }
          }
        }

        if(nbVotes != 0){
          driverRate = sum/nbVotes;
        }

        res.status(500).send({rate: driverRate, errors : []});
    }
    else
      res.status(200).send({errors : ["Impossible to find driver"]});
  })
  */

};

module.exports = NoteConducteurController;
