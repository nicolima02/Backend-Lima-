const {Router} = require("express")
const rutaCarrito = Router()
const {Carrito} = require("../controller/DAOS/carrito")
const {Productos} = require("../controller/DAOS/productos")
const {carritoModel} = require("../controller/schema")
const ProductosController = new Productos
const CarritoController = new Carrito


rutaCarrito.get("/", async(req,res)=>{
    CarritoController.iniciarMongo()
    const carritos = await CarritoController.getAll()
    res.json({
        data:carritos
    })
})


rutaCarrito.get("/:id/productos", async(req,res)=>{
    await CarritoController.iniciarMongo()
    const carritos = await CarritoController.getAll()
    console.log(carritos);
    const id = req.params.id
    const indice = carritos.findIndex(uncarrito => uncarrito.id == id)
    if(indice < 0){
        return res.status(404).json(
            {
                msg: "El producto no existe"
            }
        )
    }

    res.json({
        msg: `Devolviendo los productos del carrito con id ${id}`,
        productos: carritos[indice].productos
    })

})

rutaCarrito.post("/", async(req,res)=>{
    await CarritoController.iniciarMongo()
    if (!req.session.passport){
        res.status(401).json({msg:'iniciar sesion antes de hacer un carrito'})
    }else{
        const timestamp = Date.now()
    const carritoNew = {
        timestamp,
        productos: [],
        username: req.session.passport?.user
    }
    const user = req.session.passport.user
    let carrito = await carritoModel.find({username: user})
    if (carrito[carrito.length -1].productos.length > 0){
        await CarritoController.save(carritoNew)
    }    
    carrito = await carritoModel.find({username:user})
    res.json({
        data: carrito[carrito.length -1],
    })
    }

    
})

rutaCarrito.post("/:id/productos", async(req,res)=>{
    await CarritoController.iniciarMongo()
    const carritos = await CarritoController.getAll()
    const id = req.params.id
    const indice = carritos.findIndex(uncarrito => uncarrito.id == id)
    const productosCarrito = carritos[indice].productos
    const productos = await ProductosController.getAllProd()
    let {id_prod, cant} = req.body

    const existeProducto = productos.findIndex(unproducto => unproducto.id == id_prod)
    const productoAdd = productos[existeProducto]
    if(existeProducto === -1){
        return res.status(400).json({
            msg:"ID de producto invalido"
        })
    }

    if (!id_prod || !cant){
        return res.status(400).json({
            msg:"campos invalidos"
        })
    }

    const existeEnLista = productosCarrito.findIndex(unproducto => unproducto.id == id_prod)
    cant = parseInt(cant)
    if(existeEnLista !== -1){
        const prodActualizado = {
            title: productoAdd.title,
            price: productoAdd.price,
            thumbnail: productoAdd.thumbnail,
            codigo: productoAdd.codigo,
            desc: productoAdd.desc,
            stock: productoAdd.stock,
            "timestamp(producto)": productoAdd.timestamp,
            "id":id_prod,
            cant
        }
        productosCarrito.splice(existeEnLista,1, prodActualizado)
    }else{
        const nuevoProducto = {
            title: productoAdd.title,
            price: productoAdd.price,
            thumbnail: productoAdd.thumbnail,
            codigo: productoAdd.codigo,
            desc: productoAdd.desc,
            stock: productoAdd.stock,
            "timestamp(producto)": productoAdd.timestamp,
            "id":id_prod,
            cant
    }
    productosCarrito.push(nuevoProducto)

    }
    
    
    await CarritoController.Update(carritos[indice])
    res.json({
        data: productosCarrito
    })


})

rutaCarrito.delete("/:id", async(req,res)=>{
    await CarritoController.iniciarMongo()
    const carritos = await CarritoController.getAll()
    const id = req.params.id
    const indice = carritos.findIndex(uncarrito => uncarrito.id == id)
    if(carritos[indice]?.id){
        
    await CarritoController.deleteById(id)

    res.json({
        msg: `borrando al carrito con id ${id}`,
    })
    }else{
        res.status(404).json({
            msg:"El carrito no fue encontrado"
        })
    }
})

rutaCarrito.delete("/:id/productos/:id_prod", async (req,res)=>{
    const carritos = await CarritoController.getAll()
    const id = req.params.id
    const id_prod = req.params.id_prod
    const indice = carritos.findIndex(unCarrito => unCarrito.id == id)
    const productosEnCarrito = carritos[indice].productos
    const indiceProducto = productosEnCarrito.findIndex(unProducto => unProducto.id == id_prod)

    if(indice === -1 || indiceProducto === -1){
        res.status(404).json({
            msg:"Indices incorrectos"
        })
    }else{
        productosEnCarrito.splice(indiceProducto,1)
        await CarritoController.Update(carritos[indice])
        res.json({
            msg:`el producto con id ${id_prod} fue eliminado`
        })
    }

    
    
})
    

module.exports = rutaCarrito





