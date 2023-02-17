class ChatDTO {
    constructor({author, texto,date}){
        this.author = author
        this.texto = texto
        this.date = date
    }
}

function asDTOMSG(chat){
    if(Array.isArray(chat)){
        return chat.map(p => new ChatDTO(p))
    }else{
        return new ChatDTO(chat)
    }
}

module.exports = {ChatDTO, asDTOMSG}