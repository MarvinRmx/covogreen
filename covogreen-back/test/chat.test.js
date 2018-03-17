//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
//var app = require('../app');
var ChatController = require('../controller/ChatController');
chai.use(chaiHttp);

describe('Test ChatBack', function() {
    it('verifierParametresGetMessages', function(done) {

        // scenario nominal
        var test1 = ChatController.verifierParametresGetMessages(1,2);
        chai.assert.isObject(test1, 'verifierParametresGetMessages retourne bien un objet');
        chai.assert.isEmpty(test1["errors"], 'verifierParametresGetMessages aucune erreur');

        // scenario avec idTrajet et nbElement -> string contenant un int
        var test2 = ChatController.verifierParametresGetMessages("2","2");
        chai.assert.isObject(test2, 'verifierParametresGetMessages retourne bien un objet');
        chai.assert.isEmpty(test2["errors"], 'verifierParametresGetMessages aucune erreur');

        // scenario avec idTrajet et nbElement < 0
        var test3 = ChatController.verifierParametresGetMessages(-10,-20);
        chai.assert.isObject(test3, 'verifierParametresGetMessages retourne bien un objet');
        chai.assert.isNotEmpty(test3["errors"], 'verifierParametresGetMessages contient des erreurs');

        // scenario avec idTrajet et nbElement -> string
        var test4 = ChatController.verifierParametresGetMessages("test","toz");
        chai.assert.isObject(test4, 'verifierParametresGetMessages retourne bien un objet');
        chai.assert.isNotEmpty(test4["errors"], 'verifierParametresGetMessages aucune erreur');

        done();
    });

    it('verifierParametresGetLastMessage', function(done) {

        // scenario nominal
        var test1 = ChatController.verifierParametresGetLastMessage(1,2);
        chai.assert.isObject(test1, 'verifierParametresGetLastMessage retourne bien un objet');
        chai.assert.isEmpty(test1["errors"], 'verifierParametresGetLastMessage aucune erreur');

        // scenario avec idTrajet et nbElement -> string contenant un int
        var test2 = ChatController.verifierParametresGetLastMessage("2","2");
        chai.assert.isObject(test2, 'verifierParametresGetLastMessage retourne bien un objet');
        chai.assert.isEmpty(test2["errors"], 'verifierParametresGetLastMessage aucune erreur');

        // scenario avec idTrajet et nbElement < 0
        var test3 = ChatController.verifierParametresGetLastMessage(-10,-20);
        chai.assert.isObject(test3, 'verifierParametresGetLastMessage retourne bien un objet');
        chai.assert.isNotEmpty(test3["errors"], 'verifierParametresGetLastMessage contient des erreurs');

        // scenario avec idTrajet et nbElement -> string
        var test4 = ChatController.verifierParametresGetLastMessage("test","toz");
        chai.assert.isObject(test4, 'verifierParametresGetLastMessage retourne bien un objet');
        chai.assert.isNotEmpty(test4["errors"], 'verifierParametresGetLastMessage aucune erreur');

        done();
    });

    it('verifierParametresAddMessage', function(done) {

        // scenario nominal
        var test1 = ChatController.verifierParametresAddMessage(1,"test");
        chai.assert.isObject(test1, 'verifierParametresAddMessage retourne bien un objet');
        chai.assert.isEmpty(test1["errors"], 'verifierParametresAddMessage aucune erreur');

        // scenario avec idTrajet -> string contenant un int
        var test2 = ChatController.verifierParametresAddMessage("2","test");
        chai.assert.isObject(test2, 'verifierParametresAddMessage retourne bien un objet');
        chai.assert.isEmpty(test2["errors"], 'verifierParametresAddMessage aucune erreur');

        // scenario avec idTrajet < 0
        var test3 = ChatController.verifierParametresAddMessage(-10,"test");
        chai.assert.isObject(test3, 'verifierParametresAddMessage retourne bien un objet');
        chai.assert.isNotEmpty(test3["errors"], 'verifierParametresAddMessage contient des erreurs');

        // scenario avec idTrajet et nbElement -> string
        var test4 = ChatController.verifierParametresAddMessage(1,"");
        chai.assert.isObject(test4, 'verifierParametresAddMessage retourne bien un objet');
        chai.assert.isNotEmpty(test4["errors"], 'verifierParametresAddMessage aucune erreur');

        done();
    });

    it('verifierParametresGetTrajet', function(done) {

        // scenario nominal
        var test1 = ChatController.verifierParametresGetTrajet(1);
        chai.assert.isObject(test1, 'verifierParametresGetTrajet retourne bien un objet');
        chai.assert.isEmpty(test1["errors"], 'verifierParametresGetTrajet aucune erreur');

        // scenario avec idTrajet -> string contenant un int
        var test2 = ChatController.verifierParametresGetTrajet("2");
        chai.assert.isObject(test2, 'verifierParametresGetTrajet retourne bien un objet');
        chai.assert.isEmpty(test2["errors"], 'verifierParametresGetTrajet aucune erreur');

        // scenario avec idTrajet < 0
        var test3 = ChatController.verifierParametresGetTrajet(-10);
        chai.assert.isObject(test3, 'verifierParametresGetTrajet retourne bien un objet');
        chai.assert.isNotEmpty(test3["errors"], 'verifierParametresGetTrajet contient des erreurs');


        done();
    });
});

describe('Test ChatBack', function() {
    it('middlewareProtection',  function(done) {done();});
    it('getAuthorNameById',     function(done) {done();});
    it('getMessages',           function(done) {done();});
    it('getLastMessageById',    function(done) {done();});
    it('addMessage',            function(done) {done();});
    it('sendEmail',             function(done) {done();});
    it('getTrajet',             function(done) {done();});
});

/*
- verifierParametresGetMessages
- verifierParametresGetLastMessage

- verifierParametresAddMessage
- verifierParametresGetTrajet
*/

/*
- ChatController
    - middlewareProtection
    - getAuthorNameById
    - getMessages
    - getLastMessageById
    - addMessage
    - sendEmail
    - getTrajet
*/
