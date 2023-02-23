const axios = require('axios')

const axiosGet = async () =>{
    try {
        const response = await axios.get('http://localhost:8080/api/productos')
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {axiosGet}