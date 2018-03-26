var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

/**
 * @author Romain Lembo
 * @type {{getToken: authToken.getToken, createToken: authToken.createToken}}
 */
var authToken = {

    getToken: function(req) {

        var authorization = req.get("Authorization");
        var split = authorization.split('bearer ');
        var tokenHash = split[1];

        var tokenDecode = jwt.decode(tokenHash, skey);

        return tokenDecode;
    },

    createToken: function(data) {
        var user = JSON.stringify({id_user: data.id_user, username: data.username, privilege: data.privilege, revoked: data.revoked});
        var token = jwt.sign(user, skey);

        return token;
    }
};

module.exports = authToken;