var Chat = require("../database/models/chat");
const Op = require('sequelize').Op;


/**
 * @param idTrajet
 * @param nbElement
 *
 * On vérifie les parametres envoyé par le front de la requete getMessages
 */
function verifierParametresGetMessages(idTrajet, nbElement) {
    var out = { "messages" : [], "errors" : [] };

    // On vérifie que idTrajet est un entier et qu'il n'est pas négatif
    if(!Number.isInteger(parseInt(idTrajet)))
        out.errors.push("Le trajet n'est pas un chiffre");

    if(idTrajet < 0)
        out.errors.push("Le trajet ne peut pas être négatif");

    // On vérifie que le nbElement est strictement positif et que c'est un entier.
    if(!Number.isInteger(parseInt(nbElement)))
        out.errors.push("Le nombre d'élement n'est pas un chiffre");

    if(nbElement < 1)
        out.errors.push("Le nombre d'élement demandé doit être strictement positif");

    return out;
};

/**
 * @param idTrajet
 * @param idMessage
 *
 * On vérifie les parametres envoyé par le front pour la requete qui renvoi le message ajouté juste
 * apres un autre message (idMessage)
 */
function verifierParametresGetLastMessage(idTrajet, idMessage) {
    var out = { "messages" : [], "errors" : [] };

    // On vérifie que idTrajet est un entier et qu'il n'est pas négatif
    if(!Number.isInteger(parseInt(idTrajet)))
        out.errors.push("Le trajet n'est pas un chiffre");

    if(idTrajet < 0)
        out.errors.push("Le trajet ne peut pas être négatif");

    // On vérifie que le nbElement est strictement positif et que c'est un entier.
    if(!Number.isInteger(parseInt(idMessage)))
        out.errors.push("L'identifiant du message n'est pas un chiffre");

    if(idMessage < 1)
        out.errors.push("L'identifiant du message demandé doit être strictement positif");

    return out;
};

/**
 * @param idTrajet
 * @param message
 *
 * On vérifie les parametres envoyé par le front pour la requete qui ajoute un message dans la db.
 */
function verifierParametresAddMessage(idTrajet, message) {
    var out = { "errors" : [] };

    // On vérifie que idTrajet est un entier et qu'il n'est pas négatif
    if(!Number.isInteger(parseInt(idTrajet)))
        out.errors.push("Le trajet n'est pas un chiffre");

    if(idTrajet < 0)
        out.errors.push("Le trajet ne peut pas être négatif");

    if(message.length === 0)
        out.errors.push("Le message ne peut pas être vide");

    return out;
};

var ChatController = {
    /**
     * On récupère les X dernier messages entre les utilisateurs d'un trajet.
     * Auteur : Mohamed EL karmoudi
     *
     * Entré :
     *      idTrajet : entier
     *      nbElement : entier
     */
    getMessages: function(req, res){
        // On vérifie les paramètres
        var out = verifierParametresGetMessages(req.body.idTrajet ,req.body.nbElement);
        if(out["errors"].length > 0){
            res.send(out);
        }

        var idTrajet = parseInt(req.body.idTrajet);
        var nbElement = parseInt(req.body.nbElement);

        // Si tt est ok on récupère les dernier 'nbMessage' du trajet idTrajet dans la table CHAT
        Chat.findAll({ where: { id_trajet: idTrajet },  offset: 0,  limit : nbElement})
        .then(function(chats) {
            for (var i = 0; i< chats.length; i++){
                out["messages"].push({
                    id      : chats[i].id,
                    message : chats[i].message,
                    auteur  : chats[i].id_auteur,
                    date    : chats[i].createdAt
                });
            }
            res.send(out);
        }).catch(function (error) {
            out["errors"].push("Une erreur est survenue lors de l'execution de la req sql");
            res.status(500).send(out);
        });
    },


    /**
     * On récupère le dernier message d'un trajet.
     * Auteur : Mohamed EL karmoudi
     *
     *   Entré :
     *      idTrajet : entier
     *      idMessage : entier
     */
    getLastMessageById: function (req, res) {
        // On vérifie les paramètres
        var out = verifierParametresGetLastMessage(req.body.idTrajet, req.body.idMessage);
        if(out["errors"].length > 0){
            res.send(out);
        }

        var idTrajet = req.body.idTrajet;
        var idMessage = req.body.idMessage;

        // On récupere la date de creation du message passé en parametre.
        Chat.find({
            where: {
                id_trajet: idTrajet,
                id : idMessage
            }
        })
            .then(function(chatMessage){
                if(!chatMessage)
                    // Aucun element ne correspond dans la db
                    out["errors"].push("Aucun message ne correspond dans la db pour l'id : " + idMessage);

                // On récupère tous les messages qui ont étaient ajoutés apres la date récupéré au dessus.
                var dateMessage = chatMessage.createdAt;

                Chat.find({
                    where: {
                        id_trajet: idTrajet,
                        createdAt:{
                            [Op.gt]: dateMessage
                        }
                    }
                })
                    .then(function(chat){
                        if(!chat) // aucun message n'existe
                            res.send(out);

                        // Un message existe
                        out["messages"].push({
                            id      : chat.id,
                            message : chat.message,
                            auteur  : chat.id_auteur,
                            date    : chat.createdAt
                        });
                        res.send(out);
                    })
                    .catch(function (error) {
                        out["errors"].push("Une erreur est survenue lors de l'execution de la req sql");
                        res.status(500).send(out);
                    });
            })
            .catch(function (error) {
                out["errors"].push("Une erreur est survenue lors de l'execution de la req sql");
                res.status(500).send(out);
            });

    },


    /**
     * On ajout un message
     * Auteur : Mohamed EL karmoudi
     *
     *   Entré :
     *      idTrajet : entier
     *      message : string
     */
    addMessage: function(req, res){
        // On vérifie les paramètres
        var out = verifierParametresAddMessage(req.body.idTrajet, req.body.message);
        if(out["errors"].length > 0){
            res.send(out);
        }

        var idTrajet = req.body.idTrajet;
        var message = req.body.message;

        Chat.create({
            id_auteur   : 1,
            id_trajet   : idTrajet,
            message     : message
        })
        .then(function(chat){
            res.send("");
        })
        .catch(function(e){
            out["errors"].push("Une erreur est survenue lors de l'execution de la req sql");
            res.status(500).send(out);
        });
    },
};

module.exports = ChatController;