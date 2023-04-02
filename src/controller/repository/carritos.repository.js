const {asDTO} = require('../DTO/carrito.dto.js')
const {getDAOCarrito} = require('../DAOS/factory.js')

class CarritosRepository{
    constructor(){
        this.dao = getDAOCarrito()
    }
    
    async save (carr){
        return await this.dao.save(carr)
    }

    async getAllCarr(){
        const docs = await this.dao.getAll()
        console.log(docs);
        if (docs.length === 0){
            return docs
        }else{
            const carrDTO = docs
            return carrDTO
        }
        
    }

    async getById(id){
        const doc = await this.dao.getById(id)
        return await asDTO(doc)
    }
}



module.exports = {CarritosRepository}