/**
 * Author: Alex Zarzitski
 * Date: 25/03/2018
 */
var NoteConducteurController = require("../../controller/NoteConducteurController");
var EvaluationTrajetController = require("../../controller/EvaluationTrajetController");

module.exports = function (router) {

    router.get('/:id_driver', NoteConducteurController.doIt);

    router.post('/', EvaluationTrajetController.doIt);

};
