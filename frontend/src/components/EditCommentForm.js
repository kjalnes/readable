import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditCommentForm extends Component {
    state = {
        body: '',
        author: ''
    }

    onInputChange = (key, ev) => {
        this.setState({ [key]: ev.target.value })
    }

    onEditCommentSubmit = (ev) => {
        ev.preventDefault();
        let comment = Object.assign({}, this.props.comment, this.state);
        this.props.editComment(comment.id, comment)
        .then( () => this.props.toggleEditMode())
    }

    componentDidMount() {
        this.setState(this.props.comment);
    }

    render() {
        return(
            <div className='post-form'>
                <h4>Edit comment</h4>
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
                    <button onClick={this.onEditCommentSubmit}>Edit Comment</button>
                </form>
            </div>
        )
    }
}

EditCommentForm.propTypes = {
    comment: PropTypes.object.isRequired,
    editComment: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired
}

export default EditCommentForm;
