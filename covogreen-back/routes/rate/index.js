var NoteConducteurController = require("../../controller/NoteConducteurController");
var EvaluationTrajetController = require("../../controller/EvaluationTrajetController");
var co = require('co');

/**
 * Author: Alex Zarzitski & Romain Lembo
 * Date: 25/03/2018
 */

module.exports = function (router) {

    var getRateByDriver = co.wrap(NoteConducteurController.getRateByDriver);
    router.get('/:id_driver', getRateByDriver);

    //router.post('/', EvaluationTrajetController.doIt);

    var postRateByDriver = co.wrap(EvaluationTrajetController.postRateByDriver);
    router.post('/', postRateByDriver);

};
