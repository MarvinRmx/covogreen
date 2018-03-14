var controller = require("../../controller/journey");
var co = require('co');

module.exports = function (router) {

    var create = co.wrap(controller.create);
    router.post('/', create);

    var getJourneysByUser = co.wrap(controller.getJourneysByUser);
    router.get('/byuser', getJourneysByUser);

    var isDriverThisJourney = co.wrap(controller.isDriverThisJourney);
    router.post('/isdriver', isDriverThisJourney);
};
