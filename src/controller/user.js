const passport = require('passport')

const passportOptions = {badRequestMessage: 'falta username / password'}

const signUp = (req,res,next) =>{
    passport.authenticate('signup', passportOptions, (err,user,info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(401).json({info})
        }else{
            res.json({msg: 'signup ok'})
        }
        
    })
}

const login = (req,res) =>{
    res.json({msg: 'hola', user:req.user})
}

const getHome = (req,res) =>{
    res.json(req.session)
}

module.exports = signUp, login, getHome