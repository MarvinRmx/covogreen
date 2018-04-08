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
 * Test NoteConducteur
 */
describe('NoteConducteur', function () {
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
  describe('Get globale grade of driver', function () {
    it('Should get globale grade of driver', function testLogin (done) {
      request(app).get('/rate/8').set('Authorization', 'bearer ').set(headersUserRomain).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          done();
      });
    });
  });
});
