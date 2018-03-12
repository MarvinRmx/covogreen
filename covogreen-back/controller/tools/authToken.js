var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require('path');

var skey_path = path.join(__dirname, '../../skey.txt');
var skey = fs.readFileSync(skey_path, 'utf-8');

var authToken = {

    getToken: function(req) {
        var authorization = req.get("Authorization");
        var split = authorization.split('bearer');
        var tokenHash = split[1];

        var tokenDecode = jwt.decode(tokenHash, skey);

        return tokenDecode;
    }
};

module.exports = authToken;