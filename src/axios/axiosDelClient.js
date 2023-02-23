const axios = require('axios')

const axiosDel= async() =>{
    try {
        const response = await axios.delete('http://localhost:8080/api/productos/63f6bb6fbd629966446d1b2f')
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = axiosDel()