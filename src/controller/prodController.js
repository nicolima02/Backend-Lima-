const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../conexion.js")
const {productoModel} = require("./schema")

initMongoDB()

    getAll = async()=>{
        return await productoModel.find()
    }

    getById = async(id)=>{
        return await productoModel.find({_id: id})
    }

    saveProduct= async(product)=>{
        await productoModel.create(product)
        return product   
    }

    deleteById= async(id)=>{
        await productoModel.deleteOne({_id: new mongoose.Types.ObjectId(`${id}`)})        
        return true
    }

    deleteAll=async()=>{
        
        await productoModel.deleteMany({_id: {$exists:true}})
    }

    updatear=async(prod)=>{
        let {title,price,thumbnail, codigo, desc, stock, cant, timestamp, id} = prod
        await productoModel.updateOne({_id: id}, {$set:{title, price, thumbnail, codigo, desc, stock, cant, timestamp}})
        return prod
    }

module.exports = {getAll, getById, saveProduct, deleteById, deleteAll, updatear};
