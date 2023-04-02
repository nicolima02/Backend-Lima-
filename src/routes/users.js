const {Router} = require("express")
const users = Router() 
const express = require("express")
users.use(express.static("public"))
const passport = require('passport')
const passportOptions= {badRequestMessage: 'falta username/password'}
const {transporter, mailOptions} = require('../services/email')
const dontenv = require('dotenv')
const {initMongoDB} = require('../conexion.js')
dontenv.config()



users.post('/signup',async(req, res,next) => {
    initMongoDB()
    passport.authenticate('signup', passportOptions, async(err, user, info) => {
        
    if (err) {
        return next(err);
    }
    if (!user) return res.status(401).json({ data: info });
    mailOptions.text = `${user}`
    try {
        const response = await transporter.sendMail(mailOptions)
        console.log('Mail enviado');
        } catch (error) {
            console.log(error);
        };
    res.json({ msg: 'signup OK' , user:user});
    
    })(req, res,next)
});



users.post(
    '/login',
    function(req, res, next) {
        initMongoDB()
        passport.authenticate('login', function(err, user, info) {
        req.session.passport = {user:user.username, email: user.email, phone: user.phone}
        
        if (err) { return next(err); }
        if (!user) {
            res.status(401);
            res.end(info.message);
            return;
        }
        if(user){
            res.json({msg: `Bienvenido ${user.username}`});
        }
        })(req, res, next);
});




module.exports = users