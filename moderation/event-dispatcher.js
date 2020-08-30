const axios = require('axios');

class EventDispatcher {
  static endpoint = 'http://localhost:4005/events';

  static dispatch(type, data) {
    axios.post(this.endpoint, { type, data });
    console.log(`🚀 ${type}`, data);
  }

  static commentRejected(comment) {
    this.dispatch('CommentRejected', comment);
  }

  static commentApproved({id, postId}) {
    this.dispatch('CommentApproved', {id, postId});
  }
}

module.exports = EventDispatcher;