import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

class CommentForm extends Component {
    state = {
        body: '',
        author: ''
    }

    onInputChange = (key, ev) => {
        this.setState({ [key]: ev.target.value })
    }

    onCommentSubmit = (ev) => {
        ev.preventDefault();
        let comment = this.state;
        comment.id = uuidv1();
        comment.timestamp = Date.now();
        comment.parentId = this.props.parentId;
        this.props.createComment(comment)
        .then(() => this.props.fetchComments(comment.parentId));
    }


    render() {
        return(
            <div className='post-form'>
                <h3>Add a comment</h3>
                <form>
                    <input
                        className='input'
                        type="text"
                        name='author'
                        placeholder='Author'
                        value={this.state.author}
                        onChange={ this.onInputChange.bind(null, 'author')}/>
                    <textarea
                        className='input-body'
                        type="text"
                        name='body'
                        value={this.state.body}
                        onChange={ this.onInputChange.bind(null, 'body')}/>
                    <button onClick={this.onCommentSubmit}>Comment</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;
