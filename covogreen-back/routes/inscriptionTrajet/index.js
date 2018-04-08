
/**
 * Author: Alex Zarzitski & Marvin RAMEIX
 * Date: 19/03/2018
 */
var InscriptionTrajetController = require("../../controller/InscriptionTrajetController");
var co = require('co');


module.exports = function (router) {

    router.post('/', InscriptionTrajetController.doIt);
    router.post('/verif', InscriptionTrajetController.verif);

    var getInscriptionJourneyByJourneyAndUser = co.wrap(InscriptionTrajetController.getInscriptionJourneyByJourneyAndUser);
    router.get('/byjourneyuser/:id_journey', getInscriptionJourneyByJourneyAndUser);

    var rateAndComment = co.wrap(InscriptionTrajetController.rateAndComment);
    router.post('/rateComment/:id_journey', rateAndComment);

};
