const {Router} = require("express")
const rutaRandoms = Router()
const {fork} = require('child_process')


rutaRandoms.get('/', async(req,res)=>{
    let cantidad = 100000000   
    if(req.query.cant){
        cantidad = parseInt(req.query.cant)
    }
    const computo = fork('./src/utils/randomGenerator.js')
    computo.send({mensaje:'start', cantidad:cantidad})
    computo.on('message', (lista)=>{
        res.json({cantidad:cantidad,
            numero:lista})
    })
    
})


module.exports = rutaRandoms