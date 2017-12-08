import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions/posts';
import { sortCollection, parseDate, firstLetterUppercase } from '../utils';
import PostForm from './PostForm';
import VoteScore from './VoteScore';

class Posts extends Component {
    state = {
        filter: 'voteScore'
    }

    getAllPosts(posts) {
        let postsCollection = [];
        for(var category in posts) {
            postsCollection = postsCollection.concat(posts[category])
        }
        return postsCollection;
    }

    onFilterChange(event) {
        const filter = event.target.value;
        this.setState({filter});
    }

    onDeletePost(id) {
        this.props.deletePost(id);
    }

    goToPostAndEditMode(category, id) {
        this.props.history.push({
            pathname: `${category}/${id}`,
            state: { editMode: true }
        })
    }

    render() {
        const { category, createPost, updatePost } = this.props;
        const filters = [
            {name: 'Vote score', key: 'voteScore'},
            {name: 'Timestamp', key: 'timestamp'},
            {name: 'Comments', key: 'commentCount'}];
        let posts;
        if (this.props.posts && category) {
            posts = category === 'all' ?
                this.getAllPosts(this.props.posts) :
                this.props.posts[category] || [];
        }

        return (
            <div className='posts-box'>
                <h1>{category && firstLetterUppercase(category)}</h1>
                { posts && posts.length ?
                <div>
                    <label>Sorted by </label>
                    <select
                        name="select"
                        defaultValue={this.state.filter}
                        onChange={this.onFilterChange.bind(this)}>
                        {filters.map((filter, i) => (
                            <option value={filter.key} key={i}>
                                {filter.name}
                            </option>))}
                    </select>

                    <ul className='posts-list'>
                    {sortCollection(posts, this.state.filter).map((post, i) => (
                        <li key={i}>
                            {<VoteScore
                                id={post.id}
                                updater={updatePost}/>}
                            <Link to={`${post.category}/${post.id}`}>
                                {post.title}
                            </Link>
                            <span className='post-author'> Posted by {firstLetterUppercase(post.author)} on {parseDate(post.timestamp)}
                            </span>
                            <span className='vote-score'>
                             Votescore: {post.voteScore} | Comments: {post.commentCount}
                             </span>
                             <span className='edit-delete-btns'>
                                <button onClick={()=> this.goToPostAndEditMode(post.category, post.id)}>Edit</button>
                                <button onClick={()=> this.onDeletePost(post.id)}>Delete</button>
                            </span>
                        </li>))}
                        <hr />
                    </ul>

                </div> :
                <div className='none'>There are no posts in this category yet.</div>}
                {<PostForm
                    createPost={createPost}
                    category={category}
                    {...this.props}/>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        posts: state.postData.posts,
        category: props.category
    }
}

Posts.propTypes = {
    posts: PropTypes.object,
    category: PropTypes.string.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {...postActions})(Posts);
