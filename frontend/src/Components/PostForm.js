import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
// import PropTypes from 'prop-types';

class PostForm extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: 'react'
    }

    onInputChange = (key, ev) => {
        this.setState({ [key]: ev.target.value })
    }

    onSelectChange = (ev) => {
        this.setState({category: ev.target.value})
    }

    onPostSubmit = (ev) => {
        ev.preventDefault();
        let post = this.state;
        post.id = uuidv1();
        post.timestamp = Date.now();
        this.props.createPost(post);
        this.setState({
            title: '',
            body: '',
            author: '',
            category: 'react'})
            this.props.history.push(`${post.category}`)
            // this.props.history.push(`${post.category}/${post.id}`);
    }

    render() {
        const { categories } = this.props;
        console.log('this.props.match.params.category',this.props.match.params.category);
        return(
            <div className='post-form'>
                <h4>Add a new post</h4>
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
                    <div className='select-category'>
                        <label className='label'>Category</label>
                        <select onChange={ this.onSelectChange}>
                            {categories.map( (cat, i) => (
                                <option key={i} value={cat.path}>{cat.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    <textarea
                        className='input-body'
                        type="text"
                        name='body'
                        value={this.state.body}
                        onChange={ this.onInputChange.bind(null, 'body')}/>
                    <button onClick={this.onPostSubmit}>Post</button>
                </form>
            </div>
        )
    }
}

export default PostForm;
