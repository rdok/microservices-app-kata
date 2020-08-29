const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts', (req, res) => {
  console.log('Data set: ', JSON.stringify(commentsByPostId));
  res.send({data: commentsByPostId});
});

app.get('/posts/:id', (req, res) => {
  const post = commentsByPostId[req.params.id];
  console.log('Data set: ', JSON.stringify(post));
  res.send(post);
});

app.post('/events', (req, res) => {
  console.log(`EventRetrieved: ${req.body.type}: ${JSON.stringify(req.body.data)}`);
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    console.log(`Saving new post with id (${id})`);
    commentsByPostId[id] = { id, title, comments: [] };

  } else if (type === 'CommentCreated') {
    const {id, content, postId } = data;
    console.log(`Adding new comment for post id (${postId}).`);
    const post = commentsByPostId[postId];
    post.comments.push({id, content})
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on http://localhost:4002');
});
