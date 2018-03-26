/**
 * Author: Alex Zarzitski
 * Date: 25/03/2018
 */
var Journey = require("../database/models/journey");
var User = require("../database/models/user");
var InscriptionJourney = require("../database/models/inscriptionJourney");
const Op = require('sequelize').Op;
var co = require('co');

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

};

module.exports = NoteConducteurController;
