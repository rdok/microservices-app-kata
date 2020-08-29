const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const EventBus = require('./event-bus');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', ({ params, body }, res) => {
  const postId = params.id;
  const commentId = randomBytes(4).toString('hex');
  const comment = { id: commentId, content: body.content };
  const comments = commentsByPostId[postId] || [];
  comments.push(comment);
  EventBus.commentCreated({ postId, ...comment });
  commentsByPostId[params.id] = comments;

  res.status(201).send(comment);
});

app.post('/events', (req, res) => {
  console.log(`EventRetrieved: ${req.body.type}: ${JSON.stringify(req.body.data)}`);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on http://localhost:4001');
});
