const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors');

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', ({params, body}, res) => {
    const commentId = randomBytes(4).toString('hex')
    const comment = {id: commentId, content: body.content};
    const comments = commentsByPostId[params.id] || [];
    comments.push(comment)
    commentsByPostId[params.id] = comments;

    res.status(201).send(comment)
})

app.listen(4001, () => {
    console.log('Listening on http://localhost:4001')
})
