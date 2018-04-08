var controller = require("../../controller/journey");
var co = require('co');

/**
 * @author Romain Lembo & Marvin RAMEIX
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

    var getJourneys = co.wrap(controller.getJourneys);
    router.get('/all', getJourneys);

    var getJourneysByID = co.wrap(controller.getJourney);
    router.get('/:id_journey', getJourneysByID);

    var isCreatorOfJourney = co.wrap(controller.isCreatorOfJourney);
    router.get('/is_creator/:id_journey', isCreatorOfJourney);
};
