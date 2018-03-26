/**
 * Author: Alex Zarzitski
 * Date: 19/02/2018
 */
var Journey = require("../database/models/journey");
var User = require("../database/models/user");
const Op = require('sequelize').Op;
var co = require('co');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');
/**
 * Controleur InscriptionTrajet
 */
var InscriptionTrajetController = {


  /**
   * Exécute la tentative de l'inscription au trajet
   */
  doIt: co.wrap(function * (req, res) {
    req.accepts('application/json');

    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

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
  })
};

module.exports = InscriptionTrajetController;
