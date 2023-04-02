const MongoDB = require('../../DB/mongodb.js')
const {FileProd, FileMsg, FileCarrito} = require('../../DB/filesystem.js')
const {productosSchema, chatSchema, carritoSchema} = require('../schema.js')
let persistenceProds
let persistenceMsg
let persistenceCarrito
let argv = process.argv[2]

switch(argv){
    case "FILE":
        persistenceProds = new FileProd('src/filesystem/proddb.json')
        persistenceMsg = new FileMsg('src/filesystem/chatdb.json')
        persistenceCarrito = new FileCarrito('src/filesystem/carritosdb.json')
        break
    case "MONGO":
        persistenceMsg = new MongoDB('chats', chatSchema)
        persistenceProds = new MongoDB('productos', productosSchema)
        persistenceCarrito = new MongoDB('carritos', carritoSchema)
        persistenceMsg.initMongoDB()
        persistenceProds.initMongoDB()
        persistenceCarrito.initMongoDB()
        break
    default:
        persistenceProds = new MongoDB('productos', productosSchema)
        persistenceMsg = new MongoDB('chats', chatSchema)
        persistenceCarrito = new MongoDB('carritos', carritoSchema)
        persistenceProds.initMongoDB()
        persistenceCarrito.initMongoDB()
        persistenceMsg.initMongoDB()
        break
}

function getDAOProds(){
    return persistenceProds
}

function getDAOMsg(){
    return persistenceMsg
}

function getDAOCarrito(){
    return persistenceCarrito
}

module.exports = {getDAOProds, getDAOMsg, getDAOCarrito}
