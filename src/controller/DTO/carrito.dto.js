class CarritosDTO {
    constructor({_id, timestamp, productos, username}){
        this._id = _id
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