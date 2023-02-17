const {Router} = require("express")
const denormalizedRouter = Router()
const {getDenormalized} = require("../controller/DAOS/messages")

denormalizedRouter.get("/" ,async(req,res)=>{
    const mensajes = await getDenormalized()
    res.json({
        data:mensajes
    })
})

module.exports = denormalizedRouter