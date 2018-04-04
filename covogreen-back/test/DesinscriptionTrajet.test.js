/**
 * Author: Alex Zarzitski
 * Date: 04/04/2018
 */
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');

var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

var Journey = require("../database/models/journey");
var User = require("../database/models/user");
var InscriptionJourney = require("../database/models/inscriptionJourney");
const Op = require('sequelize').Op;
var co = require('co');

var authToken = require("./tools/authToken");
var InscriptionTrajetController = require("./InscriptionTrajetController");


/**
 * Test DesinscriptionTrajet
 */
describe('EvaluationTrajet', function () {

});
