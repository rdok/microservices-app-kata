const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventBus = require('./event-bus');
const CommentRepository = require("./comment-repository");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {};
const commentRepository = new CommentRepository(db);

app.get('/posts/comments', (req, res) => {
  res.send(db);
});

app.get('/posts/:id/comments', (req, res) => {
  res.send(db[req.params.id]);
});

app.post('/posts/:id/comments', ({ params, body }, res) => {
  const postId = params.id;
  const comment = commentRepository.store({ postId, data: body });
  EventBus.commentCreated({ postId, ...comment });

  res.status(201).send(comment);
});

app.post('/events', (req, res) => {
  const type = req.body.type;
  const data = req.body.data;
  console.log(`EventRetrieved: ${type}: ${JSON.stringify(data)}`);

  if (type === 'PostCreated') {
    db[data.id] = [];
    console.log('Initialized comments for new post.')
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on http://localhost:4001');
});
