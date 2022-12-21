const {Router} = require("express")
const users = Router() 
const express = require("express")
users.use(express.static("public"))
const passport = require('passport')
const login = require('../controller/user.js')
const isLoggedIn = require('../middlewares/islogged.js')
const passportOptions= {badRequestMessage: 'falta username/password'}

users.post('/signup', (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) return res.status(401).json({ data: info });
    res.json({ msg: 'signup OK' , user:user});
    })(req, res, next);
});

users.post('/login',passport.authenticate('login', passportOptions),function(req,res){
    res.json({msg: user})
});


// users.get('/home',getHome)

module.exports = users