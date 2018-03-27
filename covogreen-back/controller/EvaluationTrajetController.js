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
var InscriptionTrajetController = require("./InscriptionTrajetController");


/**
 * Controleur EvaluationTrajetController
 */
var EvaluationTrajetController = {

  /**
   * Cette methode enregistrer une note pour un trajet
   * @param req Trame envoyée par le client
   * @param res Trame de retour vers le client
   */
  postRateByDriver: function  (req, res) {

      var userToken = authToken.getToken(req);
      var inscriptionJourney = req.body;

      if(!userToken.revoked)
      {
          InscriptionJourney.update(
                { rate: inscriptionJourney.rate },
                { where: {
                        id: inscriptionJourney.id,
                        id_user: userToken.id_user
                    }
                }
              )
              .then(function (response) {
                  res.status(200).send("Ajout de la note OK");
              })
              .catch(function (error) {
                  console.log('Fail find for getting user :', error);
                  res.status(500).send("Echec de la notation");
              });
      }
      else res.status(500).send("Compte bloqué !");
  },


  /*doIt: co.wrap(function * (req, res) {
    req.accepts('application/json');
    // On décode le json
    var token = authToken.getToken(req);
    if(token.revoked)
      res.status(200).send({success: false, message: ["Error Token"]});

    var journey = yield Journey.findById(parseInt(req.body.idTrajet));
    var user = yield User.findById(parseInt(token.id_user));

    if(journey != null)
      if(user != null){
        var test = yield InscriptionTrajetController.checkSubscribe(journey, user);
        if(test == true){
          var condition = { 'where' : { [Op.and] : [{"id_user" : user.id_user}, {"id_trajet" : journey.id_journey}] } };
          var inscriptionJourney = yield InscriptionJourney.find(condition);
          inscriptionJourney.rate = req.body.rate;
          inscriptionJourney.save();
          res.status(500).send({errors : []});
        }
        else
          res.status(200).send({errors : ["User is not subscribed to journey"]});
      }
      else
        res.status(200).send({errors : ["Impossible to find user"]});
    else
      res.status(200).send({errors : ["Impossible to find journey"]});
  })*/

};

module.exports = EvaluationTrajetController;
