const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const LISTENERS = {
  posts: 'http://localhost:4000/events',
  comments: 'http://localhost:4001/events',
  query: 'http://localhost:4002/events',
};

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