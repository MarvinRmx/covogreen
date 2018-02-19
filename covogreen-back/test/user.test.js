//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var app = require('../app');
const request = require('supertest');

describe('User', function () {

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
                    username: "test",
                    password: "098f6bcd4621d373cade4e832627b4f6"
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    else console.log('Result:', res.text);
                    done();
                });
        });

    });

    describe('get()', function () {

        it('should accept and return user datas', function testGet (done) {
            request(app)
                .get('/user/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
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

    });

    describe('update()', function () {

        it('should update an user and return status 200', function testUpdate (done) {
            request(app)
                .put('/user')
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

        /*it('should update an user and return status 200', function testLogin (done) {
            request(app)
                .put('/user')
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
        });*/

    });

});