/**
 * Author: Alex Zarzitski
 * Date: 19/02/2018
 */
var InscriptionTrajetController = require("../../controller/InscriptionTrajetController");

module.exports = function (router) {

    router.post('/', InscriptionTrajetController.doIt);

};
