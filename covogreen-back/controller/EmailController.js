/**
 * Author : Mohamed El karmoudi
 * Date : 06/03/2018
 */
const Op = require('sequelize').Op;
var co = require('co');

const nodemailer = require('nodemailer');

var EmailController = {
    // Create a SMTP transporter object
     getTransporter: function(){
         return nodemailer.createTransport({
             host: 'smtp.ethereal.email',
             port: 587,
             auth: {
                 user: 'fbr6yhpxkrw6u2x5@ethereal.email',
                 pass: 'xDDrTfK8UwXShqPF16'
             }
         });
     },

    /**
     * Permet d'envoyer un email.
     */
    sendEmail: co.wrap(function * (username, email, subject, text){
        if(email != ""){
            // Message objet.
            var message = {
                from: 'CovoGreen <noreply@covogreen.fr>',
                to: email,
                subject: subject,
                text: text
            };
            // On envoi le message.
            EmailController.getTransporter().sendMail(message, function(err, info) {
                    if (err) {
                        console.log('Error occurred. ' + err.message);
                        return process.exit(1);
                    }

                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
    }),

};

module.exports = EmailController;