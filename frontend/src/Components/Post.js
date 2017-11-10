import React, { Component } from 'react';
import moment from 'moment';

class Post extends Component {
    state = {

    }

    parseDate(date) {
        return moment(date).format('MMMM Do YYYY');
    }

    render() {
        const { post } = this.props;
        this.parseDate(post.timestamp)
        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>Vote score: {post.voteScore}</p>
                <p>Written by {post.author} | Posted on {this.parseDate(post.timestamp)}</p>
                <p>Comments: {post.commentCount}</p>
            </div>
        )
    }
}


export default Post;
