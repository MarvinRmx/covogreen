var User = require("../database/models/user");
var sequelize = require("../database/db");
var authToken = require("./tools/authToken");

/**
 * @author Romain Lembo
 * @type {{test: LoginController.test, login: LoginController.login, all: LoginController.all, get: LoginController.get, isAdmin: LoginController.isAdmin, handleRevoked: LoginController.handleRevoked, handlePrivilege: LoginController.handlePrivilege, uniqueUsername: LoginController.uniqueUsername, create: LoginController.create, update: LoginController.update, remove: LoginController.remove}}
 *
 * FR: Couche contrôleur de l'entité User.
 * ENG: Controller layer of User Entity.
 */
var UserController = {

    /**
     * FR: Pour tester si ces données sont bien envoyées.
     * ENG: For testing sending from backend.
     * @param req
     * @param res
     */
    test: function (req, res) {
        res.send("TEST");
    },

    /**
     * FR: Pour vérifier si la paire usersame/mot de passe est valide, un utilisateur est donc connecté à l'application.
     * ENG: For checking username/password, if OK, an user is connected.
     * @param req
     * @param res
     */
    login: function (req, res) {

        var user = req.body;

        User.findOne({
            where: {
                username: user.username,
                password: user.password
            }
        })
        .then(function (response) {

            if(!response.revoked && response.revoked != null) {
                var userToken = authToken.createToken(response);
                res.status(200).send(userToken);
            }
            else res.status(203).send("Compte bloqué");
        })
        .catch(function (error) {
            console.log(error);
            res.status(401).send('Identifiant et/ou mot de passe non reconnu');
        });
    },

    /**
     * FR: Pour récupérer les données de tous les utilisateurs.
     * ENG: For getting all users.
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
     * FR: Pour récupérer les données d'un utilisateur (selon son ID).
     * ENG: For getting an user (with his ID).
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
     * FR: Pour vérifier si un utilisateur est un administrateur.
     * ENG: For checking is user is administrator.
     * @param req
     * @param res
     */
    isAdmin: function  (req, res) {
        var userToken = authToken.getToken(req);

        if(userToken)
        {
            User.findOne({
                where: { id_user: userToken.id_user }
            })
            .then(function (response) {
                var result = response.dataValues;

                if(result.privilege === 2) res.status(200).send(true);
                else res.status(200).send(false);
            })
            .catch(function (error) {
                console.log('Fail find for getting user :', error);
                res.status(500).send("Echec de la récupération du profil.");
            });
        }
        else res.status(200).send(false);

    },


    /**
     * FR: Pour mettre-à-jour la propriété revoked (révoqué) d'un utilisateur (Action seulement pour l'administrateur).
     * ENG: For updating revoked property (administrator only) .
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
     * FR: Pour mettre-à-jour la propriété privilege (privilège) d'un utilisateur (Action seulement pour l'administrateur).
     * ENG: For updating privilege property (administrator only) .
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
     * FR: Pour créer un nouvel utilisateur avec ou sans son véhicule.
     * ENG: For creating a new user and/or his car.
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
     * FR: Pour mettre-à-jour un utilisateur.
     * ENG: For updating a user.
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
     * FR: Pour supprimer un utilisateur (selon son ID).
     * ENG: For deleting an user (with his ID).
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


};


module.exports = UserController;