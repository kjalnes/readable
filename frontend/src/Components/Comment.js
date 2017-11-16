import React from 'react';
import VoteScore from './VoteScore';
import { parseDate, firstLetterUppercase } from '../utils';

const Comment = ({comment, updater}) => {
    return (
        <div className='comment-box'>
            <p>{comment.body}</p>
            <p>Vote score: {comment.voteScore}</p>
            <p>{firstLetterUppercase(comment.author)} commented on {parseDate(comment.timestamp)}</p>
            {<VoteScore parentId={comment.parentId} id={comment.id} updater={updater} />}
        </div>
    )
}




export default Comment;
