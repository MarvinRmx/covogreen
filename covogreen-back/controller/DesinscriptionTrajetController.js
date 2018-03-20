/**
 * Author: Alex Zarzitski
 * Date: 19/03/2018
 */
var Journey = require("../database/models/journey");
var User = require("../database/models/user");
var InscriptionJourney = require("../database/models/inscriptionJourney");
const Op = require('sequelize').Op;
var co = require('co');

var authToken = require("./tools/authToken");
var InscriptionTrajetController = require("./InscriptionTrajetController");


/**
 * Controleur DesinscriptionTrajetController
 */
var DesinscriptionTrajetController = {


  /**
   * Exécute la tentative de desinscription du trajet
   */
  doIt: co.wrap(function * (req, res) {
    req.accepts('application/json');
    // On décode le json
    var token = authToken.getToken(req);
    if(token.revoked)
      res.status(200).send({success: false, message: ["Error Token"]});

    var journey = yield Journey.findById(parseInt(req.body.idTrajet));
    var user = yield User.findById(parseInt(token.id_user));

    if(journey != null)
      if(user != null)
        var test = yield InscriptionTrajetController.checkSubscribe(journey, user);
        if(test == true){
          journey.seats_available = journey.seats_available+1;
          journey.save();
          var condition = { 'where' : { [Op.and] : [{"id_user" : user.id_user}, {"id_trajet" : journey.id_trajet}] } };
          var inscriptionJourney = yield InscriptionJourney.findAll(condition);
          inscriptionJourney[0].destroy();
          res.status(200).send({success: true});
        }
        else
          res.status(200).send({success: false, message: ["User is not in journey"]});
      else
        res.status(200).send({success: false, message: ["Impossible to find user"]});
    else
      res.status(200).send({success: false, message: ["Impossible to find journey"]});
  })

};

module.exports = DesinscriptionTrajetController;
