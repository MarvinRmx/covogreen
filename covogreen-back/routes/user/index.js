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

    var getFromId = co.wrap(controller.getFromId);
    router.get('/:id_user', getFromId);

    var isAdmin = co.wrap(controller.isAdmin);
    router.get('/admin', isAdmin);

    var create = co.wrap(controller.create);
    router.post('/', create);

    var handleRevoked = co.wrap(controller.handleRevoked);
    router.put('/revoked', handleRevoked);

    var handlePrivilege = co.wrap(controller.handlePrivilege);
    router.put('/privilege', handlePrivilege);

    var update = co.wrap(controller.update);
    router.put('/', update);

    var remove = co.wrap(controller.remove);
    router.delete('/', remove);
};
