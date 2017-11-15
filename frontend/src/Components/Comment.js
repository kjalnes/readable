import React from 'react';
import VoteScore from './VoteScore';
import { parseDate } from '../utils';

const Comment = ({comment, updater}) => {
    return (
    <div className='comment-box'>
        <p>{comment.body}</p>
        <p>Vote score: {comment.voteScore}</p>
        <p>{comment.author} commented on {parseDate(comment.timestamp)}</p>
        {<VoteScore id={comment.id} updater={updater} />}
    </div>
    )
}




export default Comment;
