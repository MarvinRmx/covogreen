/**
 * Author: Alex Zarzitski
 * Date: 19/03/2018
 */
var DesinscriptionTrajetController = require("../../controller/DesinscriptionTrajetController");

module.exports = function (router) {
    router.post('/', DesinscriptionTrajetController.doIt);
};
