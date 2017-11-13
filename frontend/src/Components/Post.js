import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Post extends Component {
    state = {
    }

    parseDate(date) {
        return moment(date).format('MMMM Do YYYY');
    }

    render() {
        const { post } = this.props;
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



const mapStateToProps = (state, props) => {
    const category = props.match.params.category;
    const id = props.match.params.id;
    return {
        post: state.posts[category].filter( _post => {
            return _post.id === id
        })[0]
    }
}

export default connect(mapStateToProps, null)(Post);
