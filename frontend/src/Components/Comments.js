import React, { Component } from 'react';
import Comment from './Comment';
import EditCommentForm from './EditCommentForm';
import { sortCollection }  from '../utils';

class Comments extends Component {
    state = {
        editMode: false,
        editedComment: {}
    }

    toggleEditMode(id) {
        this.props.toggleShowCommentForm();
        this.setState({editMode: !this.state.editMode});
        if(id) {
            const editedComment = this.props.comments.filter( comment => comment.id === id)[0]
            this.setState({editedComment});
        } else {
            this.setState({editedComment: {}});
        }
    }

    render() {
        const { comments, voteComment, editComment, deleteComment } = this.props;
        return (
            <div>
            { this.state.editMode  ?
                <div>
                    <EditCommentForm
                        comment={this.state.editedComment}
                        editComment={editComment}
                        toggleEditMode={this.toggleEditMode.bind(this)} />
                </div> :
                <div>
                    <h3>Comments</h3>
                    {sortCollection(comments).map( (comment, i) => (
                        <Comment
                            key={i}
                            comment={comment}
                            voteComment={voteComment}
                            deleteComment={deleteComment}
                            toggleEditMode={this.toggleEditMode.bind(this)}/>
                    ))}
                </div>
            }
            </div>
        )
    }
}

export default Comments;
