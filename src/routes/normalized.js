const {Router} = require("express")
const normalizedRouter = Router()
const {getAllMessages} = require("../controller/DAOS/messages")

normalizedRouter.get("/" ,async(req,res)=>{
    const mensajes = await getAllMessages()
    res.json({
        data:mensajes
    })
})

module.exports = normalizedRouter