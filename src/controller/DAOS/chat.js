const {initMongoDB} = require("../../conexion.js")
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