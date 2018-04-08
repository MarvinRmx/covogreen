/**
 * Author: Alex Zarzitski
 * Date: 04/04/2018
 */
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');
var authToken = require("../controller/tools/authToken");
const assert = require('assert');

/**
 * Test EvaluationTrajet
 */
describe('EvaluationTrajet', function () {
  var headersUserRomain;
  var tokenSignUserRomain;

  beforeEach(function () {
      tokenSignUserRomain = authToken.createToken(
          {id_user: 3, username: "Romain", privilege: 1, revoked: false}
      );

      headersUserRomain = {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + tokenSignUserRomain
      };
  });


  // affect une note au conducteur
  describe('Assign grade', function () {
    it('Should assign grade to the driver', function testLogin (done) {
      request(app).post('/rate').set('Authorization', 'bearer ').set(headersUserRomain)
      .send({
          rate: 3,
          id_trajet: 6
      }).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          done();
      });
    });
  });
});
