const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen('5001')

app.post('/', async function (req, res) {
    const {data} = await axios(`https://cdn.apicep.com/file/apicep/${req.body.add}.json`)
    res.send(`<p>CEP: ${data.code}</p>
              <p>Cidade: ${data.city}</p>
              <p>Estado: ${data.state}</p>
              <p>Bairro: ${data.district}</p>
              <p> Endereço: ${data.address}</p>`);
    
    
});
