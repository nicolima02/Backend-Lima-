const fs = require('fs')


class FileProd{
    constructor(path){
        this.path = path
    }

    async save(obj){
        try {
            const productos = await this.getAll()
            productos.push(obj)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
            return obj
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            if (fs.existsSync(this.path)){
                const list = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(list)
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}

class FileMsg{
    constructor(path){
        this.path = path
    }

    async save(obj){
        try {
            const productos = await this.getAll()
            console.log(productos);
            productos.push(obj)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
            return obj
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            if (fs.existsSync(this.path)){
                const list = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(list)
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}

class FileCarrito{
    constructor(path){
        this.path = path
    }

    async save(obj){
        try {
            const productos = await this.getAll()
            productos.push(obj)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
            return obj
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            if (fs.existsSync(this.path)){
                const list = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(list)
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = {FileProd, FileMsg, FileCarrito}