import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchComments,
    voteComment,
    createComment,
    editComment,
    deleteComment } from '../actions/comments';
import { updatePost, deletePost, editPost } from '../actions/posts';
import { parseDate, firstLetterUppercase }  from '../utils';
import Comments from './Comments';
import Comment from './Comment';
import VoteScore from './VoteScore';
import PostForm from './PostForm';
import EditPostForm from './EditPostForm';
import CommentForm from './CommentForm';


class Post extends Component {
    state = {
        editMode: false,
        showCommentForm: true
    }

    onDeletePost(id) {
        this.props.deletePost(id);
        this.props.history.push("/");
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    toggleShowCommentForm() {
        this.setState({showCommentForm: !this.state.showCommentForm})
    }

    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        const {
            post,
            updatePost,
            deletePost,
            editPost,
            comments,
            voteComment,
            createComment,
            fetchComments,
            editComment,
            deleteComment
             } = this.props;

        return (
            <div>
                {this.state.editMode ?
                <EditPostForm
                    post={post}
                    editPost={editPost}
                    toggleEditMode={this.toggleEditMode.bind(this)}
                    {...this.props}/> :
                <div>
                    <div>
                        <h2>{post.title}</h2>
                        <button onClick={()=> this.toggleEditMode()}>Edit</button>
                        <button onClick={()=> this.onDeletePost(post.id)}>Delete</button>
                    </div>
                    <p>{post.body}</p>
                    <br />
                    <p>Written by {firstLetterUppercase(post.author)} | Posted on {parseDate(post.timestamp)}</p>
                    <p>Comments: {post.commentCount}</p>
                    <p>Vote score: {post.voteScore}</p>
                    {<VoteScore id={post.id} updater={updatePost} />}
                    {comments && comments.length ?
                    <Comments
                        comments={comments}
                        voteComment={voteComment}
                        editComment={editComment}
                        deleteComment={deleteComment}
                        toggleShowCommentForm={this.toggleShowCommentForm.bind(this)}/> :
                    <div>There are no comments to this post yet.</div>}
                </div>
                }
                {this.state.showCommentForm ?
                <CommentForm
                    parentId={post.id}
                    createComment={createComment}
                    fetchComments={fetchComments}/> : null}
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
        editPost: (id, updates) => dispatch(editPost(id, updates)),
        fetchComments: (id) => dispatch(fetchComments(id)),
        voteComment: (parentId, id, option) => dispatch(voteComment(parentId, id, option)),
        createComment: (comment) => dispatch(createComment(comment)),
        editComment: (id, comment) => dispatch(editComment(id, comment)),
        deleteComment: (id) => dispatch(deleteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
