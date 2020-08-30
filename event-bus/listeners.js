const normalize = (port) => `http://localhost:${port}/events`

const LISTENERS = {
  posts: normalize(4000),
  comments: normalize(4001),
  query: normalize(4002),
  moderation: normalize(4003),
};


module.exports = LISTENERS
