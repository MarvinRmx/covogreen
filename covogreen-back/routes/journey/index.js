var controller = require("../../controller/journey");
var co = require('co');

/**
 * @author Romain Lembo
 * @param router
 */
module.exports = function (router) {

    var canRateAndComment = co.wrap(controller.canRateAndComment);
    router.get('/rateComment/:id_journey', canRateAndComment);

    var del = co.wrap(controller.delete);
    router.delete('/del/:id_journey', del);

    var create = co.wrap(controller.create);
    router.post('/', create);

    var getJourneysByUser = co.wrap(controller.getJourneysByUser);
    router.get('/byuser', getJourneysByUser);

    var isDriverThisJourney = co.wrap(controller.isDriverThisJourney);
    router.post('/isdriver', isDriverThisJourney);

    var getJourneysByID = co.wrap(controller.getJourneysByID);
    router.get('/:id_journey', getJourneysByID);
};
