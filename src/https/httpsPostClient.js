const https = require('https')

const postData = JSON.stringify(
    {
        title: "cartel 3",
        price: 4900,
        thumbnail: "imagen",
        codigo: 5555,
        desc: "cartel",
        stock: 45
})

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    method: 'POST',
    path: '/posts',
    headers:{
        'Content-Type': "application/json"
    }
}

const req = https.request(options, function(res){
    const chunks = []
    res.on('data', function(chunk){
        chunks.push(chunk)
    })

    res.on('end', function(chunk){
        const body = Buffer.concat(chunks)
        console.log(body.toString());
    })

    res.on('error', function(error){
        console.log(error);
    })
})

const httpsPostClient = () =>{
    req.write(postData)
    req.end()
}

module.exports = httpsPostClient