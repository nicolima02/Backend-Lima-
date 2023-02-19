// const chatoptions = require('../../options/chatDB')
// const knex = require('knex')
// const { socketEmit } = require('../services/socket')
const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../../conexion.js")
const {chatModel} = require("../schema")
const {asDTO} = require("../DTO/chat.dto.js")
const {MessagesRepository} = require('../repository/mensajes.repository.js')

const messagesController = new MessagesRepository

class chatMongo {
    async iniciarMongo(){
        await initMongoDB()
    }

    async getAll(){
        const docs = messagesController.getAll()
        return docs
    }

    async postMessage(mensaje){
        await messagesController.postMessage(mensaje)
    }
}





module.exports = chatMongo