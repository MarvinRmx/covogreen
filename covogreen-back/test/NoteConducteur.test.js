// /**
//  * Author: Alex Zarzitski
//  * Date: 04/04/2018
//  */
// process.env.NODE_ENV = 'test';
//
// //Require the dev-dependencies
// var app = require('../app');
// const request = require('supertest');
//
// var jwt = require('jsonwebtoken');
// var fs = require("fs");
// var path = require('path');
//
// var skey_path = path.join(__dirname, '../skey.txt');
// var skey = fs.readFileSync(skey_path, 'utf-8');
//
// var Journey = require("../database/models/journey");
// var User = require("../database/models/user");
// var InscriptionJourney = require("../database/models/inscriptionJourney");
// const Op = require('sequelize').Op;
// var co = require('co');
// var sequelize = require("../database/db");
// var authToken = require("./tools/authToken");
//
//
// /**
//  * Test NoteConducteur
//  */
// describe('NoteConducteur', function () {
//   it('verifierParametresGetMessages', function(done) {
//
//     // // scenario nominal
//     // var test1 = ChatController.verifierParametresGetMessages(1,2);
//     // chai.assert.isObject(test1, 'verifierParametresGetMessages retourne bien un objet');
//     // chai.assert.isEmpty(test1["errors"], 'verifierParametresGetMessages aucune erreur');
//     //
//     // // scenario avec idTrajet et nbElement -> string contenant un int
//     // var test2 = ChatController.verifierParametresGetMessages("2","2");
//     // chai.assert.isObject(test2, 'verifierParametresGetMessages retourne bien un objet');
//     // chai.assert.isEmpty(test2["errors"], 'verifierParametresGetMessages aucune erreur');
//     //
//     // // scenario avec idTrajet et nbElement < 0
//     // var test3 = ChatController.verifierParametresGetMessages(-10,-20);
//     // chai.assert.isObject(test3, 'verifierParametresGetMessages retourne bien un objet');
//     // chai.assert.isNotEmpty(test3["errors"], 'verifierParametresGetMessages contient des erreurs');
//     //
//     // // scenario avec idTrajet et nbElement -> string
//     // var test4 = ChatController.verifierParametresGetMessages("test","toz");
//     // chai.assert.isObject(test4, 'verifierParametresGetMessages retourne bien un objet');
//     // chai.assert.isNotEmpty(test4["errors"], 'verifierParametresGetMessages aucune erreur');
//
//     done();
//   });
// });
