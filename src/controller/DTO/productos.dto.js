class ProductosDTO {
    constructor({title, price, thumbnail}){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

function asDTO(prods){
    if(Array.isArray(prods)){
        return prods.map(p => new ProductosDTO(p))
    }else{
        return new ProductosDTO(prods)
    }
}

module.exports = {ProductosDTO, asDTO}