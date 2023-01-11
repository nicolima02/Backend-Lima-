const server = require("./services/server.js")
const minimist = require('minimist')
const cluster = require('cluster')
const os = require('os')
const args = minimist(process.argv.slice(2), {alias:{p:'puerto'},default:{p:8080}})
const puerto = args.p
const numCPU = os.cpus().length


if(args.CLUSTER){
    if(cluster.isPrimary){   
    console.log(process.pid);
    for (let i = 0; i < numCPU; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker,code)=>{
        cluster.fork()
    })}else{
        server.listen(puerto, ()=>{
    console.log(`Servidor listo escuchando en el puerto ${puerto} - PID: ${process.pid}` )
    })}
}else{
    server.listen(puerto, ()=>{
        console.log(`Servidor listo escuchando en el puerto ${puerto}` )
    })
}

