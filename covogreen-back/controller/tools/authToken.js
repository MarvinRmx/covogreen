var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

/**
 * @author Romain Lembo
 * @type {{getToken: authToken.getToken, createToken: authToken.createToken}}
 * FR: Outils/Méthodes pour gérer les tokens.
 */
var authToken = {

    /**
     * FR: Méthode pour décoder un token est récupérer ses données.
     * ENG: Method for decode a token and getting his data.
     * @param req
     * @returns {*}
     */
    getToken: function(req) {

        var authorization = req.get("Authorization");
        var split = authorization.split('bearer ');
        var tokenHash = split[1];

        var tokenDecode = jwt.decode(tokenHash, skey);

        return tokenDecode;
    },

    /**
     * FR: Méthode pour coder un token est ajouter ses données.
     * ENG: Method for coded a token and integrate his data.
     * @param data
     * @returns {*}
     */
    createToken: function(data) {
        var user = JSON.stringify({id_user: data.id_user, username: data.username, privilege: data.privilege, revoked: data.revoked});
        var token = jwt.sign(user, skey);

        return token;
    }
};

module.exports = authToken;