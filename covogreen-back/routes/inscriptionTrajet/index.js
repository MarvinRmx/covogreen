/**
 * Author: Alex Zarzitski
 * Date: 19/02/2018
 */
var controller = require("../../controller/InscriptionTrajetController");
var co = require('co');


module.exports = function (router) {

    router.post('/', controller.doIt);

    var rateAndComment = co.wrap(controller.rateAndComment);
    router.post('/rateComment/:id_journey', rateAndComment);
};
