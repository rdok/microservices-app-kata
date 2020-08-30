const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

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

  if (type === 'PostCreated') {
    const { id, title } = data;
    commentsByPostId[id] = { id, title, comments: {} };
    console.log(`👷 Saved new post`, commentsByPostId[id]);
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, moderationStatus } = data;
    const post = commentsByPostId[postId];
    const comment = { id, content, moderationStatus };
    post.comments[id] = comment;
    console.log(`👷 Saved new comment for post id (${postId})`, comment);
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, moderationStatus } = data;
    const post = commentsByPostId[postId];
    const comment = post.comments[id];
    comment.content = content;
    comment.moderationStatus = moderationStatus;
    console.log(`👷 Saved new comment for post id (${postId})`, comment);
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('📡 Listening on http://localhost:4002');
});
