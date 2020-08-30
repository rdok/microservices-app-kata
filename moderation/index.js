const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const CommentModerator = require('./comment-moderator')

const app = express()
app.use(bodyParser.json())

const commentModerator = new CommentModerator()

app.post('/events', (req, res) =>{
  const type = req.body.type;
  console.log(`⚡ ${type}`, req.body.data);

  if(type === 'CommentCreated') {
    const comment = req.body.data
    commentModerator.handleCreated(comment)
  }

  res.send({});
})

app.listen(4003, () => {
  console.log('📡 Listening on http://localhost:4003');
});
