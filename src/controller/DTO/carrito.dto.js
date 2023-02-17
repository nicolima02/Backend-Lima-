class CarritosDTO {
    constructor({timestamp, productos, username}){
        this.timestamp = timestamp
        this.productos = productos
        this.username = username
    }
}

function asDTO(carr){
    if(Array.isArray(carr)){
        return carr.map(c => new CarritosDTO(c))
    }else{
        return new CarritosDTO(carr)
    }
}

module.exports = {CarritosDTO, asDTO}