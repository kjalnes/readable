import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as commentActions from '../actions/comments';
import * as postActions from '../actions/posts';
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
        console.log('this.props', this.props)
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

export default connect(mapStateToProps, {...commentActions, ...postActions})(Post);
