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

    componentDidMount() {
        this.props.fetchPosts();
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

    render() {
        const { category, posts, categories, createPost } = this.props;
        const _posts = category && category === 'all' ? this.getAllPosts(posts) : posts[category];
        const filters = [
            {name: 'Vote score', key: 'voteScore'},
            {name: 'Timestamp', key: 'timestamp'},
            {name: 'Comments', key: 'commentCount'}];
        return (
            <div className='posts-list'>
                <h1>{category && firstLetterUppercase(category)}</h1>
                { _posts && _posts.length ?
                <div>
                    <label>Sort by </label>
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
                    {sortCollection(_posts, this.state.filter).map((post, i) => (
                        <li key={i}>
                            <Link to={`${post.category}/${post.id}`}>
                            {post.title} - posted on {parseDate(post.timestamp)}</Link>
                        </li>))
                    }
                    </ul>
                </div> :
                <div className='none'>
                    There are no posts in this category yet.
                </div>}
                <hr />
                {<PostForm
                    categories={categories}
                    createPost={createPost}
                    category={category}
                    {...this.props}
                />}
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    let posts = state.posts;
    console.log('posts', posts)
    for(var cat in posts) {
        posts[cat] = sortCollection(posts[cat])
    }
    return {
        posts,
        category: props.category,
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        createPost: (payload) => dispatch(createPost(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
