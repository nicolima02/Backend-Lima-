const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../../conexion")
const {carritoModel} = require("../schema")
const {asDTO} = require("../DTO/carrito.dto.js")


class Carrito {
    async iniciarMongo(){
        await initMongoDB()
    }

    async getAll() {
        const carr = await carritoModel.find()
        return asDTO(carr)
    }

    async getById(id) {
        return await carritoModel.find({_id: id})
    }

    async save(carrito) {
        try{
            await carritoModel.create(carrito)
        }catch(error){
            console.log(error)
        }
    }

    async deleteById(id) {
        await carritoModel.deleteOne({_id: new mongoose.Types.ObjectId(`${id}`)})
    }

    async deleteAll() {
        await carritoModel.deleteMany({_id: {$exists:true}})
    }

    async Update(nuevaData) {
        let {productos, id, timestamp} = nuevaData
        await carritoModel.updateOne({_id: id}, {$set:{productos}})
    }
    async cerrarMongo(){
        await disconnectMongo()
    }
}


module.exports = Carrito
