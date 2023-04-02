const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 
const carritoRouter = require("./carrito.js")


const usersRouter = require('./users.js')

const sendCarrito = require('./send_carrito.js')


rutaPrincipal.use("/productos", productosRouter)
rutaPrincipal.use("/carrito",carritoRouter)
rutaPrincipal.use("/", usersRouter)
rutaPrincipal.use("/sendCarrito",sendCarrito)


module.exports = rutaPrincipal