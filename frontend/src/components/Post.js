import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    fetchComments,
    voteComment,
    createComment,
    editComment,
    deleteComment } from '../actions/comments';
import { updatePost, deletePost, editPost, fetchPost } from '../actions/posts';
import { parseDate, firstLetterUppercase }  from '../utils';
import Comments from './Comments';
import NotFound from './NotFound';
import VoteScore from './VoteScore';
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
        this.setState({editMode: !this.state.editMode});
    }

    toggleShowCommentForm() {
        this.setState({showCommentForm: !this.state.showCommentForm});
    }

    componentDidMount() {
        if(this.props.location.state && this.props.location.state.editMode) {
            this.setState({editMode: this.props.location.state.editMode});
        }
        const postId = this.props.location.pathname.split('/')[2];
        this.props.fetchPost(postId);
        this.props.fetchComments(postId);
    }

    render() {
        const {
            post,
            updatePost,
            editPost,
            comments,
            voteComment,
            createComment,
            fetchComments,
            editComment,
            deleteComment
        } = this.props;

        if (!post) {
            return <Route component={NotFound} />;
        }

        return (
            <div>
                {this.state.editMode ?
                <EditPostForm
                    post={post}
                    editPost={editPost}
                    toggleEditMode={this.toggleEditMode.bind(this)}
                    {...this.props}/> :
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <br />
                    <p>Written by {firstLetterUppercase(post.author)} | Posted on {parseDate(post.timestamp)}</p>
                    <p>Comments: {post.commentCount} | Vote score: {post.voteScore}</p>
                    {<VoteScore id={post.id} updater={updatePost} />}
                    <button onClick={()=> this.toggleEditMode()}>Edit</button>
                    <button onClick={()=> this.onDeletePost(post.id)}>Delete</button>
                    {comments && comments.length ?
                    <Comments
                        comments={comments}
                        voteComment={voteComment}
                        editComment={editComment}
                        deleteComment={deleteComment}
                        toggleShowCommentForm={this.toggleShowCommentForm.bind(this)}/> :
                    <div className='no-comments-box'>There are no comments to this post yet.</div>}
                {this.state.showCommentForm ?
                <CommentForm
                    parentId={post.id}
                    createComment={createComment}
                    fetchComments={fetchComments}/> : null}
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const comments = state.comments ? state.comments[id] : null;
    const currentPost = state.postData.currentPost;
    const errorPost = currentPost && currentPost.error;
    const emptyPost = currentPost ? !Object.keys(currentPost).length : true;
    const post = errorPost || emptyPost ? null : currentPost;

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
        deleteComment: (id) => dispatch(deleteComment(id)),
        fetchPost: (id) => dispatch(fetchPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
