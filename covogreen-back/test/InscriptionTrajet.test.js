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
 * Test InscriptionTrajet
 */
describe('InscriptionTrajet', function () {
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

  // verifi si l'utilisateur est inscrit retour erreur
  describe('Verifier inscription if user is already subscribed', function () {
    it('Should return success the user is subscribed', function testLogin (done) {
      request(app).post('/inscriptionTrajet/verif').set('Authorization', 'bearer ').set(headersUserRomain)
      .send({ idTrajet: "5" }).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          var tmp = JSON.parse(res.text);
          assert.equal(tmp.success, false);
          done();
      });
    });
  });

  // inscrit l'utilisateur retour pas d'erreur
  describe('verifierSubscribeUser()', function () {
    it('Should subscrib user to the journey', function testLogin (done) {
      request(app).get('/inscriptionTrajet/byjourneyuser/7').set('Authorization', 'bearer ')
      .set(headersUserRomain).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          done();
      });
    });
  });
});
