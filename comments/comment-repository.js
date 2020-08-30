const { randomBytes } = require('crypto');

class CommentRepository {
  constructor(db) {
    this.db = db;
  }

  store({ postId, data }) {
    const id = randomBytes(16).toString('hex');
    const { content } = data;

    const comment = { id, postId, content, status: 'pending-moderation' };
    const comments = this.db[postId];
    comments.push(comment);
    this.db[postId] = comments;

    return comment;
  }
}

module.exports = CommentRepository;