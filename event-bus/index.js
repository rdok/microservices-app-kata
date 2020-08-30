const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const LISTENERS = require("./listeners");

const app = express();
app.use(bodyParser.json());
const db = []

app.post('/events', async (req, res) => {
  const event = req.body;

  db.push(event);

  for (const service in LISTENERS) {
    axios.post(LISTENERS[service], event);
    console.log(`🌠 ${service}.${event.type}:`, event.data);
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(db);
});

app.listen(4005, () => {
  console.log('📡 Listening on http://localhost:4005');
});