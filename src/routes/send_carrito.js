const {Router} = require("express")
const sendCarrito = Router()
const {transporter} = require('../services/email')
const dontenv = require('dotenv')
dontenv.config()
const {initMongoDB,} = require("../conexion.js")
const {carritoModel} = require("../controller/schema")

const twilio = require('twilio')

const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "",
    text: ''
}

sendCarrito.post("/", async(req,res)=>{
    await initMongoDB()
    
    if (!req.session.passport?.user){
        return res.status(401).json({msg:"Tenes que iniciar sesion para confirmar la compra"})
    }else{
        
        const user = req.session.passport.user
        const mail = req.session.passport.email
        const phone = req.session.passport.phone
        const carrito_usuario = await carritoModel.find({username: user})
        if(!carrito_usuario){
            res.status(404).json({msg:'Carrito no encontrado'})
        }
        let texto = `Pedido:\n`
        for(let i in carrito_usuario[carrito_usuario.length -1].productos){  
            texto += `${carrito_usuario[carrito_usuario.length -1].productos[i].title} x ${carrito_usuario[carrito_usuario.length -1].productos[i].cant}\n`
        }
        mailOptions.subject = `Nuevo pedido de ${user},${mail}`
        mailOptions.text = texto
        const message = {
            body: `Pedido confirmado`,
            from: process.env.WSP,
            to: `whatsapp:${phone}`
        }
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log('Mail enviado');
            } catch (error) {
                console.log(error);
            }; 
            try {
                const response = await twilio(process.env.SID, process.env.AUTH).messages.create(message)
                console.log('Mensaje enviado');
                } catch (error) {
                    console.log(error);
                };
            try {
                const response = await twilio(process.env.SID, process.env.AUTH).messages.create({
                    body: texto,
                    from: process.env.WSP,
                    to: `whatsapp:${process.env.WSPADMIN}`
                })
            } catch (error) {
                console.log(error);
            } 
        }
        res.json({msg: 'mail enviado'})
    
})


module.exports = sendCarrito