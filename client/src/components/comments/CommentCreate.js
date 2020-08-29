import React, { useEffect, useState } from 'react';
import axios from "axios";

export default ({postId}) => {
    const [content, setContent] = useState('')

    const onSubmit = async(event) => {
        event.preventDefault();
        const url = `http://localhost:4001/posts/${postId}/comments`;
        await axios.post(url, {content});
        setContent('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="new-comment">New Comment</label>
                <input
                  id="new-comment"
                  className="form-control"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
}
