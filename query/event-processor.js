const axios = require('axios');

const EVENTS_ENDPOINT = 'http://localhost:4005/events';

class EventProcessor {
  db;

  constructor(db) {
    this.db = db;
  }

  processNewEvent(type, data) {
    if (type === 'PostCreated') this.processPostCreated(data);
    if (type === 'CommentCreated') this.processCommentCreated(data);
    if (type === 'CommentUpdated') this.processCommentUpdated(data);
  }

  processCommentUpdated(data) {
    const { id, content, postId, moderationStatus } = data;
    const post = this.db[postId];
    const comment = post.comments[id];
    comment.content = content;
    comment.moderationStatus = moderationStatus;
    console.log(`👷 Saved new comment for post id (${postId})`, comment);
  }

  processCommentCreated(data) {
    const { id, content, postId, moderationStatus } = data;
    const post = this.db[postId];
    const comment = { id, content, moderationStatus };
    post.comments[id] = comment;
    console.log(`👷 Saved new comment for post id (${postId})`, comment);
  }

  processPostCreated(data) {
    const { id, title } = data;
    this.db[id] = { id, title, comments: {} };
    console.log(`👷 Saved new post`, this.db[id]);
  }

  async processExistingEvents() {
    const response = await axios.get(EVENTS_ENDPOINT);
    const events = response.data

    for (const event of events) {
      this.processNewEvent(event.type, event.data);
    }
  }
}

module.exports = EventProcessor;
