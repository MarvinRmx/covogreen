/**
 * Author: Alex Zarzitski
 * Date: 19/03/2018
 */
var InscriptionTrajetController = require("../../controller/InscriptionTrajetController");

module.exports = function (router) {

    router.post('/', InscriptionTrajetController.doIt);
    router.post('/verif', InscriptionTrajetController.verif);

};
