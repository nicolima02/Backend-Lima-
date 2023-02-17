const {asDTO} = require('../DTO/productos.dto.js')
const {asDTOMSG} = require('../DTO/chat.dto.js')
const {getDAOProds, getDAOMsg} = require('./factory.js')

class ProductsRepository{
    constructor(){
        this.dao = getDAOProds()
    }
    
    async save (prod){
        return await this.dao.save(prod)
    }

    async getAll(){
        const docs = await this.dao.getAll()
        if (docs.length === 0){
            return docs
        }else{
            const prodDTO = asDTO(docs)
            return prodDTO
        }
        
    }

    async getById(id){
        const doc = await this.dao.getById(id)
        return await asDTO(doc)
    }
}

class MessagesRepository{
    constructor(){
        this.dao = getDAOMsg()
    }

    async save(msg){
        return await this.dao.save(msg)
    }

    async getAll(){   
        return await this.dao.getAll()
    }
    
}

module.exports = {ProductsRepository, MessagesRepository}