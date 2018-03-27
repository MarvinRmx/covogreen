var controller = require("../../controller/journey");
var co = require('co');

module.exports = function (router) {

    var create = co.wrap(controller.create);
    router.post('/', create);

    var del = co.wrap(controller.delete);
    router.delete('/del/:id_journey', del);

    var getJourneysByUser = co.wrap(controller.getJourneysByUser);
    router.get('/byuser/:signe', getJourneysByUser);

    var isDriverThisJourney = co.wrap(controller.isDriverThisJourney);
    router.post('/isdriver', isDriverThisJourney);

    var canRateAndComment = co.wrap(controller.canRateAndComment);
    router.get('/rateComment/:id_journey', canRateAndComment);

    router.get('/:id_journey', controller.getJourney);
};
