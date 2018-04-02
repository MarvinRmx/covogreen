//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');

var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

describe('Journey', function () {

    var headersUser;
    var tokenSignUser;
    var journey;
    var user;

    beforeEach(function () {

        user = JSON.stringify({id_user: 1, username: "test", privilege: 1, revoked: false});
        journey = JSON.stringify({id_journey: 5, origin: "Nice", destination: "Antibes", seats_available: 2, id_driver: 3});
        tokenSignUser = jwt.sign(user, skey);

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
        it('should accept and return data of the selected journey', function testIsDriverThisJourney(done) {
            request(app)
                .get('/journey/5')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    done.error(err, 'No error');
                    done.same(res.body, journey, 'Journey as expected');
                    done.end();
                });
        });

    });
});