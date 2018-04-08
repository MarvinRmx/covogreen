//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');
var authToken = require("../controller/tools/authToken");

/**
 * @author Romain Lembo
 */
describe('Rate', function () {

    var headersUser;
    var tokenSignUser;

    var headersUserRevoked;
    var tokenSignUserRevoked;

    beforeEach(function () {

        tokenSignUser = authToken.createToken(
            {id_user: 1, username: "test", privilege: 1, revoked: false}
        );

        headersUser = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUser
        };

        tokenSignUserRevoked = authToken.createToken(
            {id_user: 8, username: "revoked", privilege: 1, revoked: true}
        );

        headersUserRevoked = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUserRevoked
        };


    });

    describe('getRateByDriver()', function () {

        it('should accept and return rate acccording to id_driver/id_user', function testGetRateByDriver (done) {

            request(app)
                .get('/rate/3')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should refused because user connected is revoked', function testGetRateByDriverRevoked (done) {

            request(app)
                .get('/rate/3')
                .set('Authorization', 'bearer ')
                .set(headersUserRevoked)
                .expect(500)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });
    });

    describe('postRateByDriver()', function () {

        it('should accept and post rate', function testPostRateByDriver (done) {

            request(app)
                .post('/rate')
                .send({
                    rate: 3,
                    id:7,
                    id_driver: 3
                })
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should refused because user connected is revoked', function testPostRateByDriverRevoked (done) {

            request(app)
                .post('/rate')
                .send({
                    rate: 3,
                    id:7,
                    id_driver: 3
                })
                .set('Authorization', 'bearer ')
                .set(headersUserRevoked)
                .expect(500)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });
    });

});