/**
 * Author: Alex Zarzitski
 * Date: 04/04/2018
 */
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');
var authToken = require("../controller/tools/authToken");


/**
 * Test InscriptionTrajet
 */
describe('InscriptionTrajet', function () {
  var headersUserRomain;

  beforeEach(function () {
      var tokenSignUserRomain = authToken.createToken(
          {id_user: 3, username: "Romain", privilege: 1, revoked: false}
      );

      headersUserRomain = {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + tokenSignUserRomain
      };
  });

  // //verifi si l'utilisateur est inscrit retour erreur
  // it('verifierInscriptionAloradySubscribed', function(done) {
  //     request(app).post('/inscriptionTrajet/verif').set('Authorization', 'bearer ').set(headersUserRomain)
  //     .send({ idTrajet: 5 }).expect(200).end(function(err, res) {
  //         if (err)
  //           return done(err);
  //         else
  //           console.log('Result:', res.text);
  //         done();
  //     });
  // });

  //inscrit l'utilisateur retour pas d'erreur
  it('verifierSubscribeUser', function(done) {
      request(app).get('/inscriptionTrajet/byjourneyuser').set('Authorization', 'bearer ')
      .set(headersUserRomain).send({ idTrajet: 7 }).expect(200).end(function(err, res) {
          if (err)
            return done(err);
          else
            console.log('Result:', res.text);
          done();
      });
  });
});
