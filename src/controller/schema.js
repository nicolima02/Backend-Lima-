const mongoose = require("mongoose")
const { stringify } = require("uuid")
const bcrypt = require('bcrypt')
const prodCollection = "productos"
const carritoCollection = "carritos"
const chatCollection = "chats"
const userCollection = "users"

const productosSchema = new mongoose.Schema(
    {
        
            title: {type: String, require: true, max: 100},
            price: {type: Number, require:true},
            thumbnail: {type: String, require:true},
            codigo: {type: Number, require:true},
            desc: {type: String, require: true},
            stock: {type: Number, require:true},
            timestamp: {type: Number, require: true},
            cant: {type:Number, require:true}   
    }
)

const carritoSchema = new mongoose.Schema(
    {
            timestamp: {type: Number, require:true},
            productos: {type: Array, require:true},
            username: {type:String, require:true}
    }
)

const chatSchema = new mongoose.Schema(
    {
        author:{type: Object, required:true,
            mail: {type:String, require:true},
            nombre: {type: String}, require:true,
            apellido: {type:String, require:true},
            edad: {type:String, require:true},
            aliass: {tpye:String, require:true},
            avatar:{type:String, require:true},
            
        },
        texto: {type:String, require:true},
        date: {type:String, require : true}
    }
)

const userSchema = new mongoose.Schema(
    {
        email:{type:String, required:true, unique:true},
        username: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        address: {type:String, required:true},
        age: {type:Number, required:true},
        phone: {type:String, required:true, unique:true},
        avatar: {type:String}
    }
)

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(15)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const productoModel = mongoose.model(prodCollection, productosSchema)
const carritoModel = mongoose.model(carritoCollection, carritoSchema)
const chatModel = mongoose.model(chatCollection, chatSchema)
const userModel = mongoose.model(userCollection, userSchema)
module.exports = {productoModel, carritoModel, chatModel, userModel}