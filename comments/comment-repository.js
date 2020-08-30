const { randomBytes } = require('crypto');
const EventDispatcher = require('./event-dispatcher')

class CommentRepository {
  constructor(db) {
    this.db = db
  }

  store({ postId, data }) {
    const id = randomBytes(16).toString('hex');
    const { content } = data;

    const comment = { id, postId, content, moderationStatus: 'pending' };
    console.log('👷 db', this.db);
    console.log('👷 Storing new comment', comment);
    let comments = this.db[postId];
    comments[id] = comment;
    this.db[postId] = comments;
    console.log('👷 Stored new comment ', comment);

    return comment;
  }

  reject({id, postId}) {
    const comment = this.db[postId][id]
    comment.moderationStatus = 'rejected'
    console.log(`👷 Rejected comment`, comment);
    EventDispatcher.commentUpdated(comment)
  }

  approve({id, postId}) {
    const comment = this.db[postId][id]
    comment.moderationStatus = 'approved'
    console.log(`👷 Approved comment`, comment);
    EventDispatcher.commentUpdated(comment)
  }
}

module.exports = CommentRepository;