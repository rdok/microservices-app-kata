const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const LISTENERS = require("./listeners");

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  for (const service in LISTENERS) {
    axios.post(LISTENERS[service], event);
    console.log(`EventBrodcasted: ${event.type}: ${JSON.stringify(event.data)}`)
  }

  res.send({ status: 'OK' });
});

app.listen(4005,() => {
  console.log('Listening on http://localhost:4005')
});