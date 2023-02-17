// const chatoptions = require('../../options/chatDB')
// const knex = require('knex')
// const { socketEmit } = require('../services/socket')
const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../../conexion.js")
const {chatModel} = require("../schema")
const {asDTO} = require("../DTO/chat.dto.js")
const {MessagesRepository} = require('./repository')

const messagesController = new MessagesRepository

class chatMongo {
    async iniciarMongo(){
        await initMongoDB()
    }

    async getMessage(){
        const docs = messagesController.getAll()
        return docs
    }

    async postMessage(mensaje){
        await chatModel.create(mensaje)
    }
}





module.exports = chatMongo