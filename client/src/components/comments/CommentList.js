import React from 'react';

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map(comment => {
    let content;
    if (comment.moderationStatus === 'approved') {
      content = comment.content;
    } else if (comment.moderationStatus === 'pending') {
      content = (<i>This comment is pending moderation.</i>);
    } else {
      content = (<i>This comment has been rejected.</i>);
    }

    return (<li key={comment.id}>{content}</li>);
  });

  return <div>
    <ul> {renderedComments} </ul>
  </div>;
}