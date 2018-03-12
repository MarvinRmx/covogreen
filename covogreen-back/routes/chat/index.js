/**
 * Author : Mohamed El karmoudi
 * Date : 05/03/2018
 */
var controller = require("../../controller/ChatController");
var co = require('co');

module.exports = function (router) {
    /**
     * Middleware qui va determiner si l'utilisateur connecté peut accéder aux info demandé.
     * Auteur : Mohamed El karmoudi
     */
    router.use(co.wrap(controller.middlewareProtection));


    // Récupérer les x dernier messages d'un trajet.
    router.post('/getMessages', co.wrap(controller.getMessages));

    // Récupérer le dernier message du trajet x.
    router.post('/getLastMessageById', co.wrap(controller.getLastMessageById));

    // Ajouter un message.
    router.post('/add', co.wrap(controller.addMessage));

    // information sur un trajet.
    router.post('/getTrajet', co.wrap(controller.getTrajet));
};

