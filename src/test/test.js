const {expect} = require('Chai')
const {axiosGet} = require('../axios/axiosGetClient.js')
const {axiosPost} = require('../axios/axiosPostClient.js')
const {productoModel} = require('../controller/schema')
const mongoose = require('mongoose')
const myHttpServer = require('../services/server.js')
const request = require('supertest')('localhost:8080')


describe('Test de integracion de request', ()=> {
    beforeEach(async()=>{
        await mongoose.connection.collections['productos'].drop()
    })
    it('Agrega un producto nuevo', async function(){
            const data = {
                title: "cartel 3",
                price: 4900,
                thumbnail: "imagen",
                codigo: 5555,
                desc: "cartel",
                stock: 45
            }
            const response = await request
                .post('/api/productos')
                .send(data);
            expect(response.statusCode).to.eql(200)
        })
        
        it('Borra un producto', async()=>{
        const data = {
            title: "cartel 3",
            price: 4900,
            thumbnail: "imagen",
            codigo: 5555,
            desc: "cartel",
            stock: 45
        }
        const responseCreate = await productoModel.create(data)
        const response = await request.delete(`/api/productos/${responseCreate._id}`)
        expect(response.statusCode).to.eql(200)
    })

    it('Longitud de la lista de productos igual a 1', async function(){
        const response = await request 
        .get('/api/productos')

        expect(response.status).to.eql(200)
    })

    

})
