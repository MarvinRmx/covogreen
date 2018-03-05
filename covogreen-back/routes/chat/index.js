var controller = require("../../controller/ChatController");
var co = require('co');

module.exports = function (router) {
    /**
     * Middleware qui va determiner si l'utilisateur connecté peut accéder aux info demandé.
     * Auteur : Mohamed El karmoudi
     */
    router.use(function (req, res, next) {
        // On récupère le token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // un token existe
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }

        next();
    });

    // Récupérer les x dernier messages d'un trajet.
    router.post('/getMessages', co.wrap(controller.getMessages));

    // Récupérer le dernier message du trajet x.
    router.post('/getLastMessageById', co.wrap(controller.getLastMessageById));

    // Ajouter un message
    router.post('/add', co.wrap(controller.addMessage));

    // information sur un trajet
    router.post('/getTrajet', co.wrap(controller.getTrajet));
};

