import React, { Component } from 'react';

class Post extends Component {
    state = {

    }

    render() {
        // console.log(this.props)
        const { post } = this.props;
        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>{post.voteScore}</p>
                <p>Written by {post.author}</p>
            </div>
        )
    }
}


export default Post;
