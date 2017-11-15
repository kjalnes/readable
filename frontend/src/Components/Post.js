import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments';
import { updateComment } from '../actions/comments';
import { updatePost } from '../actions/posts';
import { parseDate }  from '../utils';
import Comment from './Comment';
import VoteScore from './VoteScore';

class Post extends Component {
    state = {}

    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        const {
            post,
            comments,
            updateComment,
            updatePost } = this.props;
        const postComments = comments.filter( comment => {
            return comment.parentId === post.id
        })

        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>Written by {post.author} | Posted on {parseDate(post.timestamp)}</p>
                <p>Comments: {post.commentCount}</p>
                <p>Vote score: {post.voteScore}</p>
                {<VoteScore id={post.id} updater={updatePost} />}
                {postComments && postComments.length ?
                    postComments.map( (comment, i) => (
                        <Comment key={i} comment={comment} updater={updateComment}/>
                    ))
                 : null }
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
        fetchComments: (id) => dispatch(fetchComments(id)),
        updateComment: (id, option) => dispatch(updateComment(id, option)),
        updatePost: (id, option) => dispatch(updatePost(id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
