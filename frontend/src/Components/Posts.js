import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../actions/posts';
import { firstLetterUppercase } from '../utils';

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
            postsCollection.push(posts[category][0])
        }
        return postsCollection;
    }

    onFilterChange(event) {
        const filter = event.target.value;
        this.setState({filter});
    }

    sortPosts(posts) {
        const filter = this.state.filter;

        return posts.sort( (postA, postB) => {
            if(filter === 'timestamp') {
                return postA[filter] - postB[filter]
            }
            return postB[filter] - postA[filter]
        })
    }

    render() {
        const { category, posts } = this.props;
        const _posts = category ? posts[category] : this.getAllPosts(posts);
        const filters = [
            {name: 'Vote score', key: 'voteScore'},
            {name: 'Timestamp', key: 'timestamp'},
            {name: 'Comments', key: 'commentCount'}];
        return (
            <div>
                <h1>
                    {   category ?
                        firstLetterUppercase(category) :
                        <span>All posts</span>
                    }
                </h1>
                {
                    _posts ?
                    <div>
                        <label>Sort by </label>
                        <select
                            name="select"
                            defaultValue={this.state.filter}
                            onChange={this.onFilterChange.bind(this)}>
                                {filters.map((filter, i) => (
                                    <option value={filter.key} key={i}>{filter.name}</option>
                                ))}
                        </select>
                    </div> : null
                }
                <ul>
                {   _posts && _posts.length ?
                    this.sortPosts(_posts).map((post, i) => (
                        <li key={i}><Post post={post} /></li>)) :
                        <li>There are no posts in this category yet.</li>
                }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Posts);
