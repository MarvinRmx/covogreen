var NoteConducteurController = require("../../controller/NoteConducteurController");
var EvaluationTrajetController = require("../../controller/EvaluationTrajetController");
var co = require('co');

/**
 * Author: Alex Zarzitski & Romain Lembo
 * Date: 25/03/2018
 */

module.exports = function (router) {

    //router.get('/:id_driver', NoteConducteurController.doIt);

    var getJourneysByID = co.wrap(NoteConducteurController.getJourneysByID);
    router.get('/:id_driver', getJourneysByID);

    router.post('/', EvaluationTrajetController.doIt);

};
