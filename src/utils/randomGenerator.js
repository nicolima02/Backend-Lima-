function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function generarLista(cantidad){
    const lista = []
    for(let i = 0; i < cantidad; i++){  
        const num = getRandomInt(1001)
        const indice = lista.findIndex(el => el.numero == num)
        if(indice !== -1){
            lista[indice].cant += 1
        }else{
            lista.push({numero:num,cant:1})
        }
    }
    lista.sort(function(a,b){
        return a.numero - b.numero
    })
    return lista
}

process.on('message', (data)=>{
    const cantidad = data.cantidad
    if (data.mensaje == 'start'){
        const lista = generarLista(cantidad)
        process.send(lista)
    }
})



module.exports = generarLista()