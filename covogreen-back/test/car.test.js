//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');
var authToken = require("../controller/tools/authToken");

/**
 * @author Romain Lembo
 */
describe('Car', function () {

    var headersUser;
    var tokenSignUser;

    var headersUserRevoked;
    var tokenSignUserRevoked;

    var headersUserAdmin;
    var tokenSignUserAdmin;

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

        tokenSignUserAdmin = authToken.createToken(
            {id_user: 3, username: "admin", privilege: 2, revoked: false}
        );

        headersUserAdmin = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUserAdmin
        };
    });

    describe('get()', function () {

        it('should accept and return car datas', function testGet (done) {

            request(app)
                .get('/car/1')
                .set('Authorization', 'bearer ')
                .set(headersUserAdmin)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should not accept because user is revoked', function testNotGet (done) {

            request(app)
                .get('/car/1')
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

    describe('update()', function () {

        it('should update a car and return status 200', function testUpdate (done) {
            request(app)
                .put('/car/')
                .set('Authorization', 'bearer ')
                .set(headersUserAdmin)
                .send({
                    id_car: 1,
                    licencePlate: "88-11-22-33",
                    make: "Ferrari",
                    model: "Enzo",
                    capacity: 3
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('create()', function () {

        it('should create a car and return status 200', function testCreate (done) {
            request(app)
                .post('/car/')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .send({
                        user: {id_user: 2},
                        car: {
                        licencePlate: "99-11-22-33",
                        make: "Bugatti",
                        model: "Veron",
                        capacity: 3
                    }
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('delete()', function () {

        it('should delete a car and return status 200', function testCreate (done) {
            request(app)
                .delete('/car/5')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

});