import React, { useEffect, useState } from 'react';
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState({});

  const fetchComments = async () => {
    const url = `http://localhost:4001/posts/${postId}/comments`;
    const res = await axios.get(url);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = Object.values(comments).map(comment => (
    <li>{comment.content} </li>
  ));

  return <div>
    <ul> {renderedComments} </ul>
  </div>;
}