const {asDTO} = require('../DTO/productos.dto.js')
const {getDAOProds} = require('../DAOS/factory.js')

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



module.exports = {ProductsRepository}