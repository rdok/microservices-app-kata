const axios = require('axios');

module.exports = class {
  static endpoint = 'http://localhost:4005/events';

  static postCreated(post) {
    this.dispatch('PostCreated', post);
  }

  static dispatch(type, data) {
    axios.post(this.endpoint, { type, data });
    console.log(`🚀 ${type}`, data);
  }
};