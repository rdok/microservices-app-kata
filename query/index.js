const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventProcessor = require('./event-processor');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
const eventProcessor = new EventProcessor(commentsByPostId);


app.get('/posts', (req, res) => {
  res.send({ data: commentsByPostId });
});

app.get('/posts/:id', (req, res) => {
  const post = commentsByPostId[req.params.id];
  res.send(post);
});

app.post('/events', (req, res) => {
  console.log(`⚡ ${req.body.type}`, req.body.data);
  const { type, data } = req.body;
  eventProcessor.processNewEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log('📡 Listening on http://localhost:4002');

  await eventProcessor.processExistingEvents();
});
