const axios = require('axios')

const data = {
    title: "cartel 3",
    price: 4900,
    thumbnail: "imagen",
    codigo: 5555,
    desc: "cartel",
    stock: 45
}

const axiosPost = async(data) =>{
    try {
        const response = await axios.post('http://localhost:8080/api/productos', data)
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {axiosPost}