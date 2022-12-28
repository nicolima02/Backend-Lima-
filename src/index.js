const server = require("./services/server.js")
const minimist = require('minimist')
const args = minimist(process.argv.slice(2), {alias:{p:'puerto'},default:{p:8080}})
const puerto = args.p

server.listen(puerto, ()=>{
    console.log(`Servidor listo escuchando en el puerto ${puerto}` )
})