var controller = require("../../controller/user");
var co = require('co');

module.exports = function (router) {

    var test = co.wrap(controller.test);
    router.get('/test', test);

    var login = co.wrap(controller.login);
    router.post('/login', login);

    var get = co.wrap(controller.get);
    router.get('/:id_user', function (req, res) {
        var id_user = req.params.id_user;
        get(id_user, res);
    });

    var create = co.wrap(controller.create);
    router.post('/', create);

    var update = co.wrap(controller.update);
    router.put('/', update);
};
