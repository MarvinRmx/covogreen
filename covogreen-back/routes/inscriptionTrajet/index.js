var co = require('co');

/**
 * Author: Alex Zarzitski
 * Date: 19/03/2018
 */
var InscriptionTrajetController = require("../../controller/InscriptionTrajetController");

module.exports = function (router) {

    router.post('/', InscriptionTrajetController.doIt);
    router.post('/verif', InscriptionTrajetController.verif);

    var getInscriptionJourneyByJourneyAndUser = co.wrap(InscriptionTrajetController.getInscriptionJourneyByJourneyAndUser);
    router.get('/byjourneyuser/:id_journey', getInscriptionJourneyByJourneyAndUser);

};
