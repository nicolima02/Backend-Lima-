const socketIo = require('socket.io');
require('dotenv').config()
// const { ProductosController } = require('../controller/productos');
const {Productos} = require('../controller/DAOS/productos')
const options = require('../../options/db')
const chatMongo = require('../controller/DAOS/chat');
const {normalize, schema} = require("normalizr")

const ChatController = new chatMongo
const ProductosController = new Productos
let io;





const initWsServer = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {

    socket.on('allProducts', async () => {
        const productos = await ProductosController.getAllProd();
        
        productos.forEach((unProducto) => {
        socket.emit('producto', unProducto);
        });
        
    });
    socket.on("allChat", async ()=>{       
        const chatCompleto = await ChatController.getMessage()
        chatCompleto.forEach((unMensaje)=>{
            socket.emit('mensaje', unMensaje)
        })
        socket.on("mensajeRecibido", (mensaje)=>{
            
            ChatController.postMessage(mensaje)
            io.emit("mensajeAlChat", mensaje)
        })
    })
    });

    return io;
};

const socketEmit = (eventName, message) => {
    io.emit(eventName, message);
};

module.exports = {
    initWsServer,
    socketEmit,
};