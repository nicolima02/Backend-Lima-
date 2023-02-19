const {getDAOMsg} = require('../DAOS/factory.js')

class MessagesRepository{
    constructor(){
        this.dao = getDAOMsg()
    }

    async postMessage(msg){
        return await this.dao.save(msg)
    }

    async getAll(){   
        return await this.dao.getAll()
    }
    
}

module.exports = {MessagesRepository}