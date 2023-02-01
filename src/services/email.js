const nodemailer = require('nodemailer')
const dontenv = require('dotenv')
dontenv.config()

const transporter = nodemailer.createTransport({
    secure: true,
    tls: { rejectUnauthorized: false },
    host: 'smtp.gmail.com',
    port: process.env.PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Nuevo registro ',
    text: ''
}

module.exports = {transporter, mailOptions}