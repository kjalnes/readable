import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments';
import { updateComment } from '../actions/comments';
import { updatePost, deletePost } from '../actions/posts';
import { sortCollection, parseDate, firstLetterUppercase }  from '../utils';
import Comment from './Comment';
import VoteScore from './VoteScore';

class Post extends Component {
    state = {}

    onDeletePost(id) {
        this.props.deletePost(id);
        this.props.history.push("/");
    }

    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        const {
            post,
            comments,
            updateComment,
            updatePost,
            deletePost } = this.props;

        return (
            <div>
                <div>
                    <h2>{post.title}</h2>
                    <button onClick={()=> this.onDeletePost(post.id)}>Edit</button>
                    <button onClick={()=> this.onDeletePost(post.id)}>Delete</button>
                </div>
                <p>{post.body}</p>
                <p>Written by {firstLetterUppercase(post.author)} | Posted on {parseDate(post.timestamp)}</p>
                <p>Comments: {post.commentCount}</p>
                <p>Vote score: {post.voteScore}</p>
                {<VoteScore id={post.id} updater={updatePost} />}
                {comments && comments.length ?
                    sortCollection(comments).map( (comment, i) => (
                        <Comment key={i} comment={comment} updater={updateComment}/>
                    ))
                 : <div>There are no comments to this post yet.</div> }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const category = props.match.params.category;
    const id = props.match.params.id;
    const post = state.posts[category].filter( _post => _post.id === id)[0];
    const comments = state.comments ? state.comments[post.id] : null;
    return {
        post,
        comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePost: (id, option) => dispatch(updatePost(id, option)),
        deletePost: (id) => dispatch(deletePost(id)),
        fetchComments: (id) => dispatch(fetchComments(id)),
        updateComment: (parentId, id, option) => dispatch(updateComment(parentId, id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
