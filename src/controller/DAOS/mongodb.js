const mongoose = require('mongoose')


class MongoDB {
    constructor (collection, schema){
        this.collection = mongoose.model(collection, schema)
        this.initDB = mongoose.connect("mongodb+srv://nicolima:AXR6rX0SYbupWPfj@cluster0.fd1ldtn.mongodb.net/ecommerce")
    }
    async initMongoDB(){
        return this.initDB
    }

    async save(doc){
        try {
            const document = await this.collection.create(doc)
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const docs = await this.collection.find({})
            return docs
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            return await this.collection.find({_id: id})
        } catch (error) {
        }
    }
}

module.exports = MongoDB