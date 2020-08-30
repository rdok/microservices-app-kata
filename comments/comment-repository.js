const { randomBytes } = require('crypto');

class CommentRepository {
  constructor(db) {
    this.db = db;
  }

  store({ postId, data }) {
    const id = randomBytes(16).toString('hex');
    const { content } = data;

    const comment = { id, postId, content, 'moderation-status': 'pending' };
    const comments = this.db[postId];
    comments.push(comment);
    this.db[postId] = comments;

    console.log('👷 Stored new comment ', comment)

    return comment;
  }
}

module.exports = CommentRepository;