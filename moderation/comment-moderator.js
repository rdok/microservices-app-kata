const EventDispatcher = require('./event-dispatcher');

class CommentModerator {
  disallowedWords = ['orange', 'red'];

  handleCreated(comment) {
    if (comment.moderationStatus !== 'pending') return;

    const unexpectedWords = this.disallowedWords
      .filter(word => comment.content.includes(word));
    const shouldReject = unexpectedWords.length > 0;

    shouldReject
      ? EventDispatcher.commentRejected(comment)
      : EventDispatcher.commentApproved(comment);
  }
}

module.exports = CommentModerator;