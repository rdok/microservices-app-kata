const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) =>{
  console.log(`EventRetrieved: ${req.body.type}: ${JSON.stringify(req.body.data)}`);
})

app.listen(4003, () => {
  console.log('Listening on http://localhost:4003');
});
