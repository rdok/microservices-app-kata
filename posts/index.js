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
  console.log('👷 Stored new post ', post)

  EventBus.postCreated(post);
  res.status(201).send(post);
});

app.post('/events', (req, res) => {
  console.log(`⚡ ${req.body.type}`, req.body.data)
  res.send({});
})
app.listen(4000, () => {
  console.log('📡 Listening on http://localhost:4000');
});
