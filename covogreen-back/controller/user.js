var User = require("../database/models/user");
var sequelize = require("../database/db");
var co = require('co');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

var LoginController = {

    /**
     * For testing sending from backend.
     * @param req
     * @param res
     */
    test: function (req, res) {
        res.send("TEST");
    },

    /**
     * For checking username/password, if OK, an user is connected.
     * @param req
     * @param res
     */
    login: function (req, res) {

        req.accepts('application/json');

        User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(function (response) {
            var user = JSON.stringify({id: response.id, username: response.username, privilege: response.privilege});
            var token = jwt.sign(user, skey);
            res.status(200).send(token);
        })
        .catch(function (error) {
            res.status(500).send("Connexion refusée.");
        });
    },


    /**
     * For creating an new user and/or his car.
     * @param req
     * @param res
     */
    create: function  (req, res) {

        if( JSON.parse(req.body.user.have_car) ) {

            var values = {
                "firstName": req.body.user.firstName,
                "lastName": req.body.user.lastName,
                "username": req.body.user.username,
                "email": req.body.user.email,
                "password": req.body.user.password,
                "address": req.body.user.address,
                "city": req.body.user.city,
                "cp": req.body.user.cp,
                "phone": req.body.user.phone,
                "is_driver": JSON.parse(req.body.user.is_driver),

                "licencePlate": req.body.user.licencePlate,
                "make": req.body.user.make,
                "model": req.body.user.model,
                "capacity":  req.body.user.capacity
            };

            sequelize.query('CALL createUserWithCar(:firstName, :lastName, :username, :email, :password, :address, :city, :cp, :phone, :is_driver, ' +
                ':licencePlate, :make, :model, :capacity'  +
            ')',
            {replacements: values} )
            .then(function (response) {
                console.log(response);
                res.status(200).send("Ajout de l'utilisateur et de sa voiture OK");
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send("Echec de l'ajout de l'utilisateur et de sa voiture");
            });
        }
        else {

            req.body.user.privilege = 1;

            User.create(req.body.user)
                .then(function (response) {
                    res.status(200).send("Ajout de l'utilisateur OK");
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Echec de l'ajout de l'utilisateur");
                });
        }
    }

};


module.exports = LoginController;