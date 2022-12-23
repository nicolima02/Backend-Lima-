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
        const newUser = new userModel({username,password})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        return done(null,newUser)
    } catch (error) {
        console.log(error)
        return done(null,false, {message: 'error inesperado'})
    }
}

const login = async(req,username,password,done) =>{
    console.log("login");
    let user = await userModel.findOne({username})
    
    if (!user){
        return done(null, user= {username:'404', password: ''}, { mensaje: 'Usuario no encontrado' });  
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user)
        }else{
            return done(null,false)
        }
    } 
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