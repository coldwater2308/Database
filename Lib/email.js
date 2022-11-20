const nodemailer = require('nodemailer');

let transport = {

    transportMethod:  "SMTP",
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 465,
    secure: true,
    auth: {
        user: "AKIAVCSVHO4TPTFHKNHY",
        pass: "BAKYacbN6PgDaCa6Ple8BKOf7K8rODJVVjLAr2/+4WNl"
    }
};

exports.sendEmail = function(email, subject, content,attachment,cc,bcc) {

    let transporter = nodemailer.createTransport(transport);

    return new Promise((resolve, reject) => {
        let obj = {
            from: "iDesign.Market notifications@idesign.market", // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: content
        };
        if(attachment)
            obj.attachments = attachment;
        if(cc)
            obj.cc= cc
        if(bcc)
            obj.bcc= bcc
        transporter.sendMail(obj,(err,res)=>{
            console.log('send mail',err,res);
            resolve()
        });
    })
};
exports.sendCustomMail = function(name,email, subject, content,attachment,cc,bcc) {

    let transporter = nodemailer.createTransport(transport);

    return new Promise((resolve, reject) => {
        let obj = {
            from: `${name} notifications@idesign.market`, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: content
        };
        if(attachment)
            obj.attachments = attachment;
        if(cc)
            obj.cc= cc
        if(bcc)
            obj.bcc= bcc
        transporter.sendMail(obj,(err,res)=>{
            console.log('send mail',err,res);
            resolve()
        });
    })
};
