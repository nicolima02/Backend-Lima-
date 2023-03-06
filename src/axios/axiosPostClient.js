const axios = require('axios')



const axiosPost = async(data) =>{
    try {
        const response = await axios.post('http://localhost:8080/api/productos', data)
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {axiosPost}