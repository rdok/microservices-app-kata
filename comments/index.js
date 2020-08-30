const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventDispatcher = require('./event-dispatcher');
const CommentRepository = require('./comment-repository');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {};
const commentRepository = new CommentRepository(db);

app.get('/posts/comments', (req, res) => {
  res.send({data: db});
});

app.get('/posts/:id/comments', (req, res) => {
  res.send(db[req.params.id]);
});

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const body = req.body;
  const comment = commentRepository.store({ postId, data: body });
  EventDispatcher.commentCreated({ postId, ...comment });
  console.log('💽 db', db)

  res.status(201).send(comment);
});

app.post('/events', (req, res) => {
  const type = req.body.type;
  const data = req.body.data;
  console.log(`⚡ ${type}`, data);

  if (type === 'PostCreated') {
    db[data.id] = {};
    console.log('👷 Initialised comments for new post db', {[data.id]: []})
  }

  if(type === 'CommentRejected') commentRepository.reject(data);
  if(type === 'CommentApproved') commentRepository.approve(data);

  res.send({});
});

app.listen(4001, () => {
  console.log('📡 Listening on http://localhost:4001');
});
