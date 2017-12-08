import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPostForm extends Component {
    state = {
        title: '',
        body: '',
        author: ''
    }

    onInputChange = (key, ev) => {
        this.setState({ [key]: ev.target.value })
    }

    onSelectChange = (ev) => {
        this.setState({category: ev.target.value})
    }

    onEditPostSubmit = (ev) => {
        ev.preventDefault();
        let post = Object.assign({}, this.props.post, this.state);
        this.props.editPost(post.id, post)
        .then(() => this.props.toggleEditMode())
    }

    componentDidMount() {
        this.setState(this.props.post);
    }

    render() {
        return(
            <div className='post-form'>
                <h4>Edit post</h4>
                <form>
                    <input
                        className='input'
                        type="text"
                        name='title'
                        placeholder='Title'
                        value={this.state.title}
                        onChange={ this.onInputChange.bind(null, 'title')}/>
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
                    <button onClick={this.onEditPostSubmit}>Edit Post</button>
                </form>
            </div>
        )
    }
}

EditPostForm.propTypes = {
    post: PropTypes.object.isRequired,
    editPost: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired
}

export default EditPostForm;
