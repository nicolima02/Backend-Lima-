const MongoDB = require('./mongodb.js')
const {FileProd, FileMsg} = require('./filesystem.js')
const {productosSchema, chatSchema} = require('../schema.js')
let persistenceProds
let persistenceMsg
let argv = process.argv[2]
const path = require('path')
const file = path.resolve(__dirname, "")

switch(argv){
    case "FILE":
        persistenceProds = new FileProd('src/filesystem/proddb.json')
        persistenceMsg = new FileMsg('src/filesystem/chatdb.json')
        break
    case "MONGO":
        persistenceMsg = new MongoDB('chats', chatSchema)
        persistenceProds = new MongoDB('productos', productosSchema)
        persistenceMsg.initMongoDB()
        persistenceProds.initMongoDB()
        break
    default:
        persistenceProds = new MongoDB('productos', productosSchema)
        persistenceMsg = new MongoDB('chats', chatSchema)
        persistenceProds.initMongoDB()
        persistenceMsg.initMongoDB()
        break
}

async function save(obj){

    return await persistence.save(obj)
}

async function getAll(){
    return await persistence.getAll()
    
}

async function getById(id){
    return await persistence.getById(id)
}

function getDAOProds(){
    return persistenceProds
}

function getDAOMsg(){
    return persistenceMsg
}

module.exports = {getDAOProds, getDAOMsg}
