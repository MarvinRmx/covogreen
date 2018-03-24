var User = require("../database/models/user");
var sequelize = require("../database/db");
var authToken = require("./tools/authToken");
var co = require('co');
var jwt = require('jsonwebtoken');

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

        var user = req.body;

        User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(function (response) {

            console.log('login :', response);

            if(!response.revoked && response.revoked != null) {
                var userToken = authToken.createToken(response);
                res.status(200).send(userToken);
            }
            else res.status(203).send("Compte bloqué");
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send('Identifiant et/ou mot de passe non reconnu');
        });
    },

    /**
     * For getting all users.
     * @param req
     * @param res
     */
    all: function (req, res) {

        req.accepts('application/json');

        User.all()
        .then(function (response) {
            res.status(200).send(response);
        })
        .catch(function (error) {
            res.status(500).send("Echec de la récupération de tous les utilisateurs.");
        });
    },

    /**
     * For getting an user.
     * @param req
     * @param res
     */
    get: function  (req, res) {
        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            User.findOne({
                where: {id_user: userToken.id_user}
            })
            .then(function (response) {
                res.status(200).send(response.dataValues);
            })
            .catch(function (error) {
                console.log('Fail find for getting user :', error);
                res.status(500).send("Echec de la récupération du profil.");
            });
        }
        else res.status(500).send("Compte bloqué !");
    },

    /**
     * For checking is user is administrator.
     * @param req
     * @param res
     */
    isAdmin: function  (req, res) {
        var userToken = authToken.getToken(req);

        User.findOne({
            where: { id_user: userToken.id_user }
        })
        .then(function (response) {
            var result = response.dataValues;
            console.log('isAdmin :', result.privilege);

            if(result.privilege === 2) res.status(200).send(true);
            else res.status(200).send(false);
        })
        .catch(function (error) {
            console.log('Fail find for getting user :', error);
            res.status(500).send("Echec de la récupération du profil.");
        });
    },


    /**
     * For updating revoked property (administrator only) .
     * @param req
     * @param res
     */
    handleRevoked: function  (req, res) {

        var userToken = authToken.getToken(req);
        var user = req.body;

        if(userToken.privilege === 2 && !userToken.revoked)
        {
            User.update({ revoked: user.revoked }, { where: {id_user: user.id_user} } )
                .then(function (response) {
                    res.status(200).send("Modification de la propriété revoked OK");
                })
                .catch(function (error) {
                    console.log('Fail find for getting user :', error);
                    res.status(500).send("Echec de la modification de la propriété revoked");
                });
        }
        else res.status(500).send("Seul l'administrateur peut effectuer cette action.");
    },

    /**
     * For updating privilege property (administrator only) .
     * @param req
     * @param res
     */
    handlePrivilege: function  (req, res) {

        var userToken = authToken.getToken(req);
        var user = req.body;

        if(userToken.privilege === 2 && !userToken.revoked)
        {
            User.update({ privilege: user.privilege }, { where: {id_user: user.id_user} } )
                .then(function (response) {
                    res.status(200).send("Modification de la propriété privilege OK");
                })
                .catch(function (error) {
                    console.log('Fail find for getting user :', error);
                    res.status(500).send("Echec de la modification de la propriété privilege");
                });
        }
        else res.status(500).send("Seul l'administrateur peut effectuer cette action.");
    },

    uniqueUsername: function (value) {
        return User.findAndCountAll({where: { username: value }});
    },

    /**
     * For creating an new user and/or his car.
     * @param req
     * @param res
     */
    create: function  (req, res) {

        var unique = module.exports.uniqueUsername(req.body.user.username);

        unique
            .then(function (result) {

                if(result.count > 0) {
                    res.status(200).send("Username déjà utilisé !");
                    return null;
                }
                else
                {
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

                        module.exports.uniqueUsername(values.username);

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
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send("Echec de l'ajout de l'utilisateur");
            });
    },

    /**
     * For updating a user.
     * @param req
     * @param res
     */
    update: function  (req, res) {

        var user = req.body;
        var userToken = authToken.getToken(req);

        console.log('update data : ', user);

        if (!userToken.revoked)
        {
            User.update(user, {where: {id_user: userToken.id_user}})
                .then(function (response) {
                    res.status(200).send("Succès de la mise-à-jour du profil.");
                })
                .catch(function (error) {
                    console.log('Fail update user :', error);
                    res.status(500).send("Echec de la mise-à-jour du profil.");
                });
        }
        else res.status(500).send("Compte bloqué !");
    },

    /**
     * For deleting an user.
     * @param req
     * @param res
     */
    remove: function  (req, res) {

        var userToken = authToken.getToken(req);

        if (!userToken.revoked)
        {
            sequelize.query('CALL deleteUser('+ userToken.id_user +')')
                .then(function (response) {
                    res.status(200).send("Succès de la suppression du profil.");
                })
                .catch(function (error) {
                    console.log('Fail update user :', error);
                    res.status(500).send("Echec de la suppression du profil.");
                });
        }
        else res.status(500).send("Compte bloqué !");
    },

    /**
     * Getting an user from his id_user
     * @param req
     * @param res
     */
    getFromId: function (req, res) {
        User.findById(req.params.id_user)
                .then(function (response) {
                        res.status(200).send(response.dataValues);
                    }).catch(function (error){
                        console.log(error);res.status(500).send("Echec de la récupération du profil.");
                });
        }
};


module.exports = LoginController;