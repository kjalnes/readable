import React from 'react';
import PropTypes from 'prop-types';
import VoteScore from './VoteScore';
import { parseDate, firstLetterUppercase } from '../utils';


const Comment = ({ comment, voteComment, deleteComment, toggleEditMode }) => {
    return (
        <div>
            <div className='comment-box'>
                <p className='comment-body'>{comment.body}</p>
                <p>Vote score: {comment.voteScore}</p>
                <p>{firstLetterUppercase(comment.author)} commented on {parseDate(comment.timestamp)}</p>
                {<VoteScore parentId={comment.parentId} id={comment.id} updater={voteComment} />}
                <button onClick={()=> toggleEditMode(comment.id)}>Edit</button>
                <button onClick={()=> deleteComment(comment.id) }>Delete</button>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    voteComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired
}

export default Comment;
