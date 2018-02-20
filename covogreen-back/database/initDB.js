var co = require('co');

var Car = require('./models/car');
var User = require('./models/user');
var Journey = require('./models/journey');
var Participation = require('./models/participation');

var initDB = co(
    function * (){
        yield Car.sync({force: false});
        yield User.sync({force: false});
        yield Journey.sync({force: false});
        yield Participation.sync({force: false});
    }
);

module.exports = initDB;
