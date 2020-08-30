const EventBus = require("./event-bus");

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(16).toString('hex');
  const { title } = req.body;
  const post = { id, title };
  posts[id] = post;

  EventBus.postCreated(post);
  res.status(201).send(post);
});

app.post('/events', (req, res) => {
  console.log(`EventRetrieved: ${req.body.type}: ${JSON.stringify(req.body.data)}`)
  res.send({});
})
app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
});
