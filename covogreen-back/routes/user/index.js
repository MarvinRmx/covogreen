var controller = require("../../controller/user");
var co = require('co');

module.exports = function (router) {

    var test = co.wrap(controller.test);
    router.get('/test', test);

    var all = co.wrap(controller.all);
    router.get('/', all);

    var login = co.wrap(controller.login);
    router.post('/login', login);

    var get = co.wrap(controller.get);
    router.get('/get', get);

    var create = co.wrap(controller.create);
    router.post('/', create);

    var handleRevoked = co.wrap(controller.handleRevoked);
    router.put('/revoked', handleRevoked);

    var handlePrivilege = co.wrap(controller.handlePrivilege);
    router.put('/privilege', handlePrivilege);

    var update = co.wrap(controller.update);
    router.put('/', update);

    var remove = co.wrap(controller.remove);
    router.delete('/:id_user', function (req, res) {
        var id_user = req.params.id_user;
        remove(id_user, res);
    });
};
