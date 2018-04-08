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
 * Test RechercheTrajet
 */
describe('RechercheTrajet', function () {
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
  describe('Verifier get journey', function () {
    it('Should get all journeys', function testLogin (done) {
      request(app).post('/recherche').set('Authorization', 'bearer ').set(headersUserRomain)
      .send({
          depart: "",
          destination: "",
          auteur: "",
          date_trajet: "",
          place_libre: false,
          page: ""
      }).expect(200).end(function(err, res) {
          if (err)
            return done(err);

          var tmp = JSON.parse(res.text);
          assert.equal(tmp.success, true);
          done();
      });
    });

  });
});
