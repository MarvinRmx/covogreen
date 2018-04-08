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
 * Test DesinscriptionTrajet
 */
describe('DesinscriptionTrajet', function () {
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


  //desinscrit l'utilisateur, retour pas d'erreur
  describe('Verifier unsubscribing', function () {
    it('Should return success the user is unsubscribed', function testLogin (done) {
      request(app).post('/desinscriptionTrajet').set('Authorization', 'bearer ').set(headersUserRomain)
      .send({ idTrajet: "7" }).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          done();
      });
    });
  });


});
