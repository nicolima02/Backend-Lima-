const {buildSchema} = require('graphql')
const {getAll, getById, saveProduct, deleteById, deleteAll, updatear} = require('../controller/prodController.js')




const graphqlSchema = buildSchema(`
type Product{
    _id: String
    title: String
    price: Int
    thumnail: String
    codigo: Int
    desc: String
    stock: Int
    timestamp: Int
    cant: Int
}

type Query{
    getAll:[Product]
    getById(_id:String!):[Product]
} 

input ProductInput{
    title: String!
    price: Int!
    thumnail: String!
    codigo: Int!
    desc: String!
    stock: Int
    cant: Int
}

type Mutation{
    saveProduct(data:ProductInput):Product
    updatear(id:String!, data:ProductInput):Product
    deleteById(id:String!):Boolean
}`
)



const graphqlRoot = {
    getAll, 
    getById, 
    saveProduct, 
    deleteById,  
    updatear
}

module.exports = {graphqlRoot, graphqlSchema}