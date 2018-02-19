/**
 * Author: Alex Zarzitski
 * Date: 04/02/2018
 */
var RechercheTrajetController = require("../../controller/RechercheTrajetController");

module.exports = function (router) {

    router.post('/', RechercheTrajetController.doIt);

};
