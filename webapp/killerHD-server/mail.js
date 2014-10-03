'use strict';
/*login: killer.itkweb
mdp: d4g5j4u?54^
service: gmail.com*/
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'killer.itkweb@gmail.com',
        pass: 'd4g5j4u?54^'
    }
});

// Options must contain : to, subject, text and/or html
function Mail(opt){
    this.from = 'Killer ITK ✔ <killer.itkweb@gmail.com>'; // sender address
    this.to = opt.to;
    this.subject = '[Killer] ' + opt.subject;
    this.text = opt.text;
    this.html = opt.html || opt.text;
}

Mail.prototype.send = function(){
    var self = this;
    transporter.sendMail(self, function(error){
        if(error){
            console.log(error);
        }else{
            console.log('[INFO] Message sent to : ' + self.to);
        }
    });
};

module.exports = Mail;