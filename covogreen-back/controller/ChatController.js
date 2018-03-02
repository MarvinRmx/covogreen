/*
* 1 : Demander les 20 derniers messages
/chat/getMessages -> POST
Frontend { idTrajet : xx, nbElement: 20} --> Backend { massages : [{id:xx, message:XXXX, auteur:xxxx, date:xxxx}], errors : [] }

2 : Demander les derniers messages apartire de l'identifiant ( le dernier message afficher dans le chat )
/chat/getLastMessageById -> POST
Frontend { idTrajet : xx, idMessage : XX} --> Backend { massages : [{id:xx, message:XXXX, auteur:xxxx, date:xxxx}], errors : [] }

3 : Envoie un message
/chat/add -> POST
Frontend { idTrajet : xx, message : "mon text"} --> Backend { errors : [] }
*/

var ChatController = {
    /**
     * On récupère les X dernier messages entre les utilisateurs d'un trajet.
     * Auteur : Mohamed EL karmoudi
     */
    getMessages: function(req, res){
        // IN
        // idTrajet
        // nbElement

        // OUT
        // {
        //      messages : [
        //          {
        //              id:xx,
        //              message:XXXX,
        //              auteur:xxxx,
        //              date:xxxx
        //          }
        //      ],
        //      errors : []
        // }
    },

    /**
     * On récupère le dernier message d'un trajet.
     * Auteur : Mohamed EL karmoudi
     */
    getLastMessageById: function (req, res) {
        // IN
        // idTrajet
        // idMessage

        // OUT
        // {
        //      massages : [
        //          {
        //              id:xx,
        //              message:XXXX,
        //              auteur:xxxx,
        //              date:xxxx
        //          }
        //      ],
        //      errors : []
        // }

    },

    /**
     * On ajout un message
     * Auteur : Mohamed EL karmoudi
     */
    addMessage: function(req, res){
        // IN
        // idTrajet
        // message
        // idUser from token

        // OUT
        // {
        //      errors : []
        // }
    },
};

module.exports = ChatController;
