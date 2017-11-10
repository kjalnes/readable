import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../actions/posts';



class Posts extends Component {
    state = {

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

    render() {
        const { category, posts } = this.props;
        const _posts = category ?
            posts[category] :
            this.getAllPosts(posts);
        return (
            <div>
                <h1>{category || <span>All posts</span>}</h1>
                <select name="select">
                  <option value="value1">Value 1</option>
                  <option value="value2" selected>Value 2</option>
                  <option value="value3">Value 3</option>
                </select>
                <ul>
                {   _posts && _posts.length ?
                    _posts.map( (_post, i) => <li key={i}><Post post={_post} /></li>) :
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
