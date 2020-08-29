import React from 'react';

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map(comment => (
    <li key={comment.id}>{comment.content} </li>
  ));

  return <div>
    <ul> {renderedComments} </ul>
  </div>;
}