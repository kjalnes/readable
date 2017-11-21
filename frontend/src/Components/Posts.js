import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/posts';
import { createPost } from '../actions/posts';
import { firstLetterUppercase } from '../utils';
import { sortCollection, parseDate } from '../utils';
import PostForm from './PostForm';

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

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { category, createPost } = this.props;
        const posts = category && category === 'all' ?
             this.getAllPosts(this.props.posts) :
             this.props.posts[category];
        const filters = [
            {name: 'Vote score', key: 'voteScore'},
            {name: 'Timestamp', key: 'timestamp'},
            {name: 'Comments', key: 'commentCount'}];
        return (
            <div className='posts-list'>
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

                    <ul>
                    {sortCollection(posts, this.state.filter).map((post, i) => (
                        <li key={i}>
                            <Link to={`${post.category}/${post.id}`}>
                                {post.title} - posted on {parseDate(post.timestamp)}
                            </Link>
                        </li>))}
                    </ul>
                </div> :
                <div className='none'>
                    There are no posts in this category yet.
                </div>}
                <hr />
                {<PostForm
                    createPost={createPost}
                    category={category}
                    {...this.props}/>}
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    let posts = state.posts;
    for(var cat in posts) {
        posts[cat] = sortCollection(posts[cat])
    }
    return {
        posts,
        category: props.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        createPost: (payload) => dispatch(createPost(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
