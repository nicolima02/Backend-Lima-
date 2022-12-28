const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 
const carritoRouter = require("./carrito.js")
const normalizedRouter = require("./normalized.js")
const denormalize = require("./desnormalized.js")
const productosTest = require("./productostest.js")
const usersRouter = require('./users.js')
const randomRouter = require('./randoms.js')


rutaPrincipal.use("/productos", productosRouter)
rutaPrincipal.use("/carrito",carritoRouter)
rutaPrincipal.use("/normalized", normalizedRouter)
rutaPrincipal.use("/productos-test", productosTest)
rutaPrincipal.use("/denormalized", denormalize)
rutaPrincipal.use("/", usersRouter)
rutaPrincipal.use("/randoms", randomRouter)


module.exports = rutaPrincipal