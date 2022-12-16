const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 
const carritoRouter = require("./carrito.js")
const normalizedRouter = require("./normalized.js")
const denormalize = require("./desnormalized.js")
const productosTest = require("./productostest.js")


rutaPrincipal.use("/productos", productosRouter)
rutaPrincipal.use("/carrito",carritoRouter)
rutaPrincipal.use("/normalized", normalizedRouter)
rutaPrincipal.use("/productos-test", productosTest)
rutaPrincipal.use("/denormalized", denormalize)


module.exports = rutaPrincipal