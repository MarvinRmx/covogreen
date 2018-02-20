/**
 * Author: Alex Zarzitski
 * Date: 04/02/2018
 */
var Journey = require("../database/models/journey");
var User = require("../database/models/user");
const Op = require('sequelize').Op;
var co = require('co');


/**
 * Controleur RechercheTrajet qui retourne une liste de trajet en fonctiont de la demmande des filtres
 */
var RechercheTrajetController = {

  /**
   * Execute le deroulement de recuperation des trajet
   */
  doIt: co.wrap(function * (req, res) {
  	req.accepts('application/json');
    var result = RechercheTrajetController.checkRequest(req.body);
    if(result.success){
      var condition = RechercheTrajetController.getResearchCondition(req.body);
      result = yield RechercheTrajetController.getListTrajet(req.body, result, condition);
      result.nb_total_page = yield RechercheTrajetController.getNbPage(condition);
    }
  	res.send(JSON.stringify(result));
  }),

  /**
   *
   * @param request Trame envoier par les filtres
   * @param result Trame qui retourne les erreurs, les trajets, le nobre de page
   * @param condition
   */
  getListTrajet: co.wrap(function * (request, result, condition) {
    var journeyList = yield Journey.findAll(condition);

    if(journeyList != null)
      for(var i = 0; i < journeyList.length; i++){
        var driver = yield User.findById(journeyList[i].id_driver);
        result.trajets.push(
          {
            id : journeyList[i].id_journey,
    				depart : journeyList[i].origin,
    				destination : journeyList[i].destination,
    				auteur : driver.firstName + " " + driver.lastName,
    				date_trajet : journeyList[i].date_journey,
    				nombre_place_disponible : 2
    			}
        );
      }

    return result;
  }),

  /**
   * Cette methode calcule le nobre de page pour tout la recherceh
   * @param journey Le trajet
   * @return le nobre de page
   */
  getNbPage: co.wrap(function * (condition)
  {
    condition.offset = 0;
    condition.limit = 0;
    var result = yield Journey.findAndCountAll(condition);

    var nb_page = parseInt(result.count / 10);

    if( (result.count % 10) != 0)
      nb_page++;

    return nb_page;
  }),

  /**
   * Cette methode donne le nobre de places restante dans un trajet
   * @param journey Le trajet
   * @return le nobre de places restante
   */
  getAvailablePlaces: co.wrap(function * (journey)
  {
    // à coder
  }),

  /**
   * genere l'objet condition en fonctiont de la requete recu pour rechercher les trajets avec sequelize
   * @param request Trame envoier par les filtres
   * @return l'objet condition pour rechercher les trajets
   */
  getResearchCondition: function(request)
	{
    var condition = { 'where' : { [Op.and] : [] }, 'offset' : 0, 'limit' : 10 };

    if (request.depart != "")
      condition.where[Op.and].push({ "origin" : {[Op.like] : '%' + request.depart + '%'} });

    if (request.destination != "")
      condition.where[Op.and].push({ "destination" : {[Op.like] : '%' + request.destination + '%'} });

    if (request.date_trajet != ""){
      var date = request.date_trajet;
      condition.where[Op.and].push({ "date_journey" : {[Op.between] : [ date + " 00:00:00", date + " 23:59:59" ]} });
    }

    if (request.page != "" && request.page > 1)
      condition.offset = ((request.page-1)*10);

		return condition;
	},

  /**
   * Cette methode test si la requete recu est correct.
   * @param request Trame qui retourne les erreurs, les trajets, le nobre de page
   * @return l'objet result initialiser ou ramplies avec les messages d'erreurs
   */
	checkRequest: function(request)
	{
    var result = { "success" : true, "message" : [], "trajets" : [], "nb_total_page" : 5 };

    if (typeof(request.depart) == "undefined"){
      result.success = false;
      result.message.push("Error can't find 'depart' attribute!");
    }
    if (typeof(request.destination) == "undefined"){
      result.success = false;
      result.message.push("Error can't find 'destination' attribute!");
    }
    if (typeof(request.date_trajet) == "undefined"){
      result.success = false;
      result.message.push("Error can't find 'date_trajet' attribute!");
    }
    if (typeof(request.place_libre) == "undefined"){
      result.success = false;
      result.message.push("Error can't find 'place_libre' attribute!");
    }
    if (typeof(request.page) == "undefined"){
      result.success = false;
      result.message.push("Error can't find 'page' attribute!");
    }

		return result;
	}

};

module.exports = RechercheTrajetController;
