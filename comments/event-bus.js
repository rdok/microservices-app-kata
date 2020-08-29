const axios = require('axios');

module.exports = class {
  static endpoint = 'http://localhost:4005/events';

  static commentCreated(comment) {
    this.dispatch('CommentCreated', { comment });
  }

  static dispatch(type, data) {
    axios.post(this.endpoint, { type, data });
    console.log(`EventDispatched: ${type}: ${JSON.stringify(data)}`)
  }
};