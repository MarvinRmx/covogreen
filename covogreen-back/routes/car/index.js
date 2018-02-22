var controller = require("../../controller/car");
var co = require('co');

module.exports = function (router) {

    var create = co.wrap(controller.create);
    router.post('/', create);

    var get = co.wrap(controller.get);
    router.get('/:id_car', function (req, res) {
        var id_car = req.params.id_car;
        get(id_car, res);
    });
};
