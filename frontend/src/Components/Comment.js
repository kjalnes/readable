import React, { Component } from 'react';
import VoteScore from './VoteScore';
// import EditCommentForm from './EditCommentForm';
import { parseDate, firstLetterUppercase } from '../utils';



class Comment extends Component  {
    render() {
        const { comment, voteComment, toggleEditMode } = this.props;
        return (
            <div>
                <div className='comment-box'>
                    <p>{comment.body}</p>
                    <p>Vote score: {comment.voteScore}</p>
                    <p>{firstLetterUppercase(comment.author)} commented on {parseDate(comment.timestamp)}</p>
                    {<VoteScore parentId={comment.parentId} id={comment.id} updater={voteComment} />}
                    <button onClick={()=> toggleEditMode(comment.id)}>Edit</button>

                </div>
            </div>
        )
    }
}




export default Comment;
