var controller = require("../../controller/car");
var co = require('co');

/**
 * @author Romain Lembo
 * @param router
 */
module.exports = function (router) {

    var get = co.wrap(controller.get);
    router.get('/:id_car', get);

    var create = co.wrap(controller.create);
    router.post('/', create);

    var update = co.wrap(controller.update);
    router.put('/', update);

    var remove = co.wrap(controller.remove);
    router.delete('/:id_car', remove);
};
