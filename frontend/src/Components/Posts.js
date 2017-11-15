import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Post from './Post';
import { fetchPosts } from '../actions/posts';
import { firstLetterUppercase } from '../utils';

class Posts extends Component {
    state = {
        filter: 'voteScore'
    }

    componentDidMount(props) {
        this.props.fetchPosts();
        // this.props.fetchCategories();
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
        // console.log('category',category)
        const _posts = category && category === 'all' ? this.getAllPosts(posts) : posts[category];
        const filters = [
            {name: 'Vote score', key: 'voteScore'},
            {name: 'Timestamp', key: 'timestamp'},
            {name: 'Comments', key: 'commentCount'}];
        return (
            <div>
                <h1>
                    {
                        category && firstLetterUppercase(category)
                    }
                </h1>
                {
                    _posts && _posts.length ?
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

                        <ul>
                        {this.sortPosts(_posts).map((post, i) => (
                            <li key={i}>
                                <Link to={`${post.category}/${post.id}`}>{post.title}</Link>
                            </li>))
                        }
                        </ul>
                    </div> :
                    <li>There are no posts in this category yet.</li>
                }
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
