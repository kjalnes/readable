import React from 'react';
import { parseDate } from '../utils';

const Comment = ({comment}) => {
    return (
    <div className='comment-box'>
        <p>{comment.body}</p>
        <p>Vote score: {comment.voteScore}</p>
        <p>{comment.author} commented on {parseDate(comment.timestamp)}
        </p>
    </div>
    )
}

export default Comment;
