import React from 'react';

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map(comment => {
    let content = comment.moderationStatus === 'approved'
      ? comment.content
      : (<i>This comment has been rejected.</i>);

    return (<li key={comment.id}>{content}</li>);
  });

  return <div>
    <ul> {renderedComments} </ul>
  </div>;
}