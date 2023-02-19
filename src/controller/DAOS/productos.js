// const fs = require('fs');
// const path = require("path")
// const knex = require('knex');
// const options = require('../../options/db')
// const file = path.resolve(__dirname, "../../productos.txt")
const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../../conexion.js")
const {productoModel} = require("../schema")
const {ProductsRepository} = require('../repository/productos.repository.js')

const producto = new ProductsRepository

class Productos {
    async iniciarMongo(){
        await initMongoDB()
    }

    async getAllProd(){
        return await producto.getAll()
    }

    async getById(id){
        try {
            return await producto.getById(id)
        } catch (error) {
            
        }
        
    }

    async saveProduct(product){
        try{
            await producto.save(product)
        }catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        await productoModel.deleteOne({_id: new mongoose.Types.ObjectId(`${id}`)})        
    }

    async deleteAll(){
        
        await productoModel.deleteMany({_id: {$exists:true}})
    }

    async updatear(prod){
        let {title,price,thumbnail, codigo, desc, stock, cant, timestamp, id} = prod
        await productoModel.updateOne({_id: id}, {$set:{title, price, thumbnail, codigo, desc, stock, cant, timestamp}})
    }

    async cerrarMongo(){
        await disconnectMongo()
    }
}

module.exports = {Productos};
