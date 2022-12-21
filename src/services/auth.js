const passport = require("passport")
const {Strategy} = require("passport-local")
const {userModel} = require("../controller/schema")
const {initMongoDB, disconnectMongo} = require('../conexion.js')
const session = require('express-session')



const strategyOptions = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}

const signup = async(req,username,password,done)=>{
    console.log("signup")
    try {
        await initMongoDB()
        const newUser = await userModel.create({username,password})
        return done(null,newUser)
    } catch (error) {
        console.log(error)
        return done(null,false, {message: 'error inesperado'})
    }
}

const login = async(req,username,password,done) =>{
    console.log("login");
    const user = await userModel.findOne({username, password})
    if (!user) return done(null, false, { mensaje: 'Usuario no encontrado' });  
    return done(null, user)
}

const loginFunc = new Strategy(strategyOptions,login)
const signupFunc = new Strategy(strategyOptions, signup)
module.exports = {loginFunc, signupFunc}

passport.serializeUser((user,done)=>{
    done(null,user.username)
})

passport.deserializeUser(async(userId,done)=>{
    const user = await userModel.findOne({userId})
    return done(null,user)
})