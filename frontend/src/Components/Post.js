import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments';
import { parseDate }  from '../utils';
import Comment from './Comment';

class Post extends Component {
    state = {
    }

    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        const { post, comments } = this.props;
        const postComments = comments.filter( comment => {
            return comment.parentId === post.id
        })

        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>Vote score: {post.voteScore}</p>
                <p>Written by {post.author} | Posted on {parseDate(post.timestamp)}</p>
                <p>Comments: {post.commentCount}</p>
                <p> {postComments && postComments.length ?
                    postComments.map( comment => (
                        <Comment comment={comment} />
                    ))
                 : null }
                 </p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const category = props.match.params.category;
    const id = props.match.params.id;
    return {
        post: state.posts[category].filter( _post => _post.id === id)[0],
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (id) => dispatch(fetchComments(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
