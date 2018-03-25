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

/**
 * @author Romain Lembo
 */
describe('User', function () {

    var headersUser;
    var tokenSignUser;
    var user;

    var headersUserRevoked;
    var tokenSignUserRevoked;
    var userRevoked;

    var headersUserAdmin;
    var tokenSignUserAdmin;
    var userAdmin;

    var headersUserTata;
    var tokenSignUserTata;
    var userTata;

    beforeEach(function () {


        user = JSON.stringify({id_user: 1, username: "test", privilege: 1, revoked: false});
        tokenSignUser = jwt.sign(user, skey);

        headersUser = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUser
        };

        userRevoked = JSON.stringify({id_user: 8, username: "revoked", privilege: 1, revoked: true});
        tokenSignUserRevoked = jwt.sign(userRevoked, skey);

        headersUserRevoked = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUserRevoked
        };

        userAdmin = JSON.stringify({id_user: 3, username: "admin", privilege: 2, revoked: false});
        tokenSignUserAdmin = jwt.sign(userAdmin, skey);

        headersUserAdmin = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUserAdmin
        };

        userTata = JSON.stringify({id_user: 11, username: "tata1", privilege: 1, revoked: false});
        tokenSignUserRevoked = jwt.sign(userTata, skey);

        headersUserTata = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + tokenSignUserRevoked
        };
    });

    describe('test()', function () {

        it('result to test method', function testTest(done) {
            request(app)
                .get('/user/test')
                .expect(200, done);
        });

    });

    describe('login()', function () {

        it('should accept and return user token', function testLogin (done) {
            request(app)
                .post('/user/login')
                .send({
                    username: "admin",
                    password: "098f6bcd4621d373cade4e832627b4f6"
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should refuse and return error 500 status', function testLogin (done) {
            request(app)
                .post('/user/login')
                .send({
                    username: "username",
                    password: "ererezrezr"
                })
                .expect(500)
                .end(function(err, res) {
                    console.log('Result:', res.text);
                    done();
                });
        });

        it('should refuse, because user is revoked', function testLogin (done) {
            request(app)
                .post('/user/login')
                .send({
                    username: "revoked",
                    password: "098f6bcd4621d373cade4e832627b4f6"
                })
                .expect(500)
                .end(function(err, res) {
                    console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('get()', function () {

        it('should accept and return user datas', function testGet (done) {

            request(app)
                .get('/user/get')
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
                .get('/user/get')
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

    describe('all()', function () {

        it('should accept and return all users datas', function testAll (done) {

            request(app)
                .get('/user/')
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

    describe('isAdmin()', function () {

        it('should accept and return true if is administrator', function testIsAdmin (done) {

            request(app)
                .get('/user/admin')
                .set('Authorization', 'bearer ')
                .set(headersUserAdmin)
                .expect(200)
                .expect("true")
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should not accept and return false', function testIsNotAdmin (done) {

            request(app)
                .get('/user/admin')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(500)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('handleRevoked()', function () {

        it('should accept if is administrator', function testHandleRevoked(done) {

            request(app)
                .put('/user/revoked/')
                .send({
                    id_user: 1,
                    username:"test",
                    revoked: false
                })
                .set('Authorization', 'bearer ')
                .set(headersUserAdmin)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should not accept if is not administrator', function testHandleRevoked500(done) {

            request(app)
                .put('/user/revoked/')
                .send({
                    id_user: 1,
                    username:"test",
                    revoked: false
                })
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('handlePrivilege()', function () {

        it('should accept if is administrator', function testHandlePrivilege(done) {

            request(app)
                .put('/user/privilege/')
                .send({
                    id_user: 1,
                    username:"test",
                    privilege: 1
                })
                .set('Authorization', 'bearer ')
                .set(headersUserAdmin)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should not accept if is not administrator', function testHandlePrivilege500 (done) {

            request(app)
                .put('/user/privilege/')
                .send({
                    id_user: 1,
                    username:"test",
                    privilege: 1
                })
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('create()', function () {

        it('should a new user without car', function testCreateWithoutCar (done) {
            request(app)
                .post('/user/')
                .send({
                    user : {
                        address: "100, Champs Elysée",
                        capacity: "",
                        city: "Paris",
                        cp: 75000,
                        email: "tata@email.fr",
                        firstName: "Tata",
                        have_car: "false",
                        is_driver: "false",
                        lastName: "Tata",
                        password: "2f6c2404198add983753e94fc24e752f",
                        phone: "0600000001",
                        username: "tata"
                    },
                    car: {
                        licencePlate: "",
                        make: "",
                        model: "",
                        capacity: 0
                    }
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should a new user with car', function testCreateWithCar (done) {
            request(app)
                .post('/user/')
                .send({
                    user : {
                        address: "100, Champs Elysée",
                        capacity: "",
                        city: "Paris",
                        cp: 75000,
                        email: "tata@email.fr",
                        firstName: "Tata",
                        have_car: "false",
                        is_driver: "false",
                        lastName: "Tata",
                        password: "2f6c2404198add983753e94fc24e752f",
                        phone: "0600000001",
                        username: "tata1"
                    },
                    car: {
                        licencePlate: "00-00-00",
                        make: "Renault",
                        model: "Twingo",
                        capacity: 4
                    }
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

        it('should return a error because the username is already used', function testUniqueUsername (done) {
            request(app)
                .post('/user/')
                .send({
                    user : {
                        address: "100, Champs Elysée",
                        capacity: "",
                        city: "Paris",
                        cp: 75000,
                        email: "tata@email.fr",
                        firstName: "Tata",
                        have_car: "false",
                        is_driver: "false",
                        lastName: "Tata",
                        password: "2f6c2404198add983753e94fc24e752f",
                        phone: "0600000001",
                        username: "admin"
                    }
                })
                .expect("Username déjà utilisé !")
                .end(function(err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('update()', function () {

        it('should update an user and return status 200', function testUpdate (done) {
            request(app)
                .put('/user/')
                .set('Authorization', 'bearer ')
                .set(headersUser)
                .send({
                    id_user: 1,
                    firstName:"Toto",
                    lastName:"Tata",
                    username:"test",
                    password:"098f6bcd4621d373cade4e832627b4f6",
                    email:"test@test.fr",
                    privilege: 1,
                    is_driver: false
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('remove()', function () {

        it('should remove an user and return status 200', function testRemove (done) {
            request(app)
                .delete('/user/')
                .set('Authorization', 'bearer ')
                .set(headersUserTata)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

});