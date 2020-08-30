const axios = require('axios');

class EventDispatcher {
  static endpoint = 'http://localhost:4005/events';

  static commentCreated(comment) {
    this.dispatch('CommentCreated', comment);
  }

  static commentUpdated(comment) {
    this.dispatch('CommentUpdated', comment);
  }

  static dispatch(type, data) {
    axios.post(this.endpoint, { type, data });
    console.log(`🚀 ${type}`, data);
  }
}

module.exports = EventDispatcher;