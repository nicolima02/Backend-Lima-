const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config

const connectionString = "mongodb+srv://nicolima:AXR6rX0SYbupWPfj@cluster0.fd1ldtn.mongodb.net/ecommerce"

//"mongodb://localhost:27017/ecommerce" "mongodb+srv://nicolima:AXR6rX0SYbupWPfj@cluster0.fd1ldtn.mongodb.net/ecommerce"
const initMongoDB = async ()=>{
    try{
        await mongoose.connect(connectionString)
    }catch(error){
        console.log(`ERROR: ${error}`)
        return error
    }
}

const disconnectMongo = async () =>{
    try{
        
        await mongoose.disconnect()
    }catch(error){
        console.log(`ERROR: ${error}`)
        return error
    }
}

module.exports = {initMongoDB, disconnectMongo}