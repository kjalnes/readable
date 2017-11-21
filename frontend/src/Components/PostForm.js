import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { firstLetterUppercase } from '../utils';


class PostForm extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: this.props.category
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
        this.props.createPost(post)
        .then(  () => {
            this.props.history.push(`${post.category}/${post.id}`)
        });
    }

    componentDidMount() {
        // set default category to 'react'
        if(this.props.category === 'all') {
            this.setState({category: 'react'})
        }
    }

    render() {
        const { categories, category } = this.props;
        return(
            <div className='post-form'>

                <form>
                    { category === 'all' ?
                    <div>
                        <h4>Add a new post</h4>
                        <div className='select-category'>
                            <label className='label'>Select category</label>
                            <select onChange={ this.onSelectChange}>
                                {categories.map( (cat, i) => (
                                    <option key={i} value={cat.path}>{cat.name}</option>
                                ))
                                }
                            </select>
                        </div>
                    </div> :
                    <h4> Add a new post to {firstLetterUppercase(category)}</h4> }
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
                    <button onClick={this.onPostSubmit}>Post</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(PostForm);
