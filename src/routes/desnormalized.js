const {Router} = require("express")
const denormalizedRouter = Router()
const {getDenormalized} = require("../controller/messages")

denormalizedRouter.get("/" ,async(req,res)=>{
    const mensajes = await getDenormalized()
    console.log(mensajes)
    res.json({
        data:mensajes
    })
})

module.exports = denormalizedRouter