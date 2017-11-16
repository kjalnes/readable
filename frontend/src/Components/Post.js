import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments';
import { updateComment } from '../actions/comments';
import { updatePost, deletePost } from '../actions/posts';
import { sortCollection, parseDate }  from '../utils';
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
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>Written by {post.author} | Posted on {parseDate(post.timestamp)}</p>
                <p>Comments: {post.commentCount}</p>
                <p>Vote score: {post.voteScore}</p>
                {<VoteScore id={post.id} updater={updatePost} />}
                <button onClick={()=> this.onDeletePost(post.id)}>Delete</button>
                {comments[post.id] && comments[post.id].length ?
                    sortCollection(comments[post.id]).map( (comment, i) => (
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
    const posts = state.posts[category];
    return {
        post: posts.filter( _post => _post.id === id)[0],
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (id) => dispatch(fetchComments(id)),
        updateComment: (parentId, id, option) => dispatch(updateComment(parentId, id, option)),
        updatePost: (id, option) => dispatch(updatePost(id, option)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
