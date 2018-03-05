var express = require('express');
var router = express.Router();
var co = require('co');

var Car = require('../database/models/car');
var User = require('../database/models/user');
var Journey = require('../database/models/journey');
var Participation = require('../database/models/participation');
var Chat = require('../database/models/chat');

co(
    function * (){
        yield Car.sync({force: false});
        yield User.sync({force: false});
        yield Journey.sync({force: false});
        yield Participation.sync({force: false});
        yield Chat.sync({force: false});
    }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
