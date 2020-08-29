const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts/:id', (req, res) => {
  console.log('Data set: ', JSON.stringify(posts));
  res.send(posts[req.params.id]);
});

app.post('/events', (req, res) => {
  console.log(`EventRetrieved: ${req.body.type}: ${JSON.stringify(req.body.data)}`);
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { post } = data;
    console.log('Saving new post: ', JSON.stringify(post));
    posts[post.id] = { ...post, comments: [] };
  } else if (type === 'CommentCreated') {
    const { comment } = data;
    const postId = comment.postId
    console.log('Adding new comment: ', JSON.stringify(comment));
    const comments = posts[postId].comments;
    comments.push(comment)
    posts[postId].comments = comments
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on http://localhost:4002');
});
