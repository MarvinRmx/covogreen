var controller = require("../../controller/ChatController");
var co = require('co');

module.exports = function (router) {
    // Récupérer les x dernier messages d'un trajet.
    router.post('/getMessages', co.wrap(controller.getMessages));

    // Récupérer le dernier message du trajet x.
    router.post('/getLastMessageById', co.wrap(controller.getLastMessageById));

    // Ajouter un message
    router.post('/add', co.wrap(controller.addMessage));
};

