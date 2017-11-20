import React from 'react';
import VoteScore from './VoteScore';
import { parseDate, firstLetterUppercase } from '../utils';


const Comment = ({ comment, voteComment, deleteComment, toggleEditMode }) => {

    return (
        <div>
            <div className='comment-box'>
                <p>{comment.body}</p>
                <p>Vote score: {comment.voteScore}</p>
                <p>{firstLetterUppercase(comment.author)} commented on {parseDate(comment.timestamp)}</p>
                {<VoteScore parentId={comment.parentId} id={comment.id} updater={voteComment} />}
                <button onClick={()=> toggleEditMode(comment.id)}>Edit</button>
                <button onClick={()=> deleteComment(comment.id) }>Delete</button>
            </div>
        </div>
    )
}




export default Comment;
