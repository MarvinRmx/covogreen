var co = require('co');

var Car = require('./models/car');
var User = require('./models/user');
var Journey = require('./models/journey');
var Participation = require('./models/participation');
var Chat = require('./models/chat');
var InscriptionJourney = require('./models/inscriptionJourney');

var initDB = co(
    function * (){
        // PB detecté : execution de la synchronisation des tables 2 fois lors du lanceent du svr.
        /*yield Car.sync({force: false});
        yield User.sync({force: false});
        yield Journey.sync({force: false});
        yield Participation.sync({force: false});
        yield Chat.sync({force: false});
        yield InscriptionJourney.sync({force: false});*/
    }
);

module.exports = initDB;
