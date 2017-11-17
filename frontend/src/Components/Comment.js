import React, { Component } from 'react';
import VoteScore from './VoteScore';
import { parseDate, firstLetterUppercase } from '../utils';

class Comment extends Component  {
    state = {
        editMode: false
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        const { comment, updater } = this.props;
        const { editMode } = this.state;
        return (
            <div>
                { editMode ?
                <div> Edit mode</div> :
                <div className='comment-box'>
                    <p>{comment.body}</p>
                    <p>Vote score: {comment.voteScore}</p>
                    <p>{firstLetterUppercase(comment.author)} commented on {parseDate(comment.timestamp)}</p>
                    {<VoteScore parentId={comment.parentId} id={comment.id} updater={updater} />}
                    <button onClick={()=> this.toggleEditMode()}>Edit</button>

                </div>
                }
            </div>
        )
    }
}




export default Comment;
