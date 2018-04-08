//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');
var authToken = require("../controller/tools/authToken");

/**
 * @author Romain Lembo
 */
describe('Journey', function () {

    var headersUser;
    var tokenSignUser;

    beforeEach(function () {

        tokenSignUser = authToken.createToken(
            {id_user: 1, username: "test", privilege: 1, revoked: false}
        );

        headersUser = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUser
        };

    });

    describe('getJourneysByUser()', function () {

        it('should accept and return journey datas', function testGetJourneysByUser(done) {

            request(app)
                .get('/journey/byuser')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });
    });

    describe('isDriverThisJourney()', function () {

        it('should accept and return true or false', function testIsDriverThisJourney(done) {

            request(app)
                .post('/journey/isdriver')
                .send({
                    id_journey: 5
                })
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });
    });

    describe('getJourney()', function () {
        it('should accept and return data of the selected journey', function testGetJourney(done) {
            request(app)
                .get('/journey/5')
                .expect('Content-Type', /json/)
                .expect(200, {
                    "id_journey": 5,
                    "origin": "Nice",
                    "destination": "Antibes",
                    "seats_available": 2,
                    "date_journey": "2018-03-13T00:00:00.000Z",
                    "createdAt": "2018-03-13T00:00:00.000Z",
                    "updatedAt": "2018-03-11T00:00:00.000Z",
                    "id_driver": 3
                })
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});