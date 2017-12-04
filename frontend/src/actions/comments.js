import { RECEIVE_COMMENTS, UPDATE_COMMENT } from '../constants';
import { fetchPost } from './posts';

const server = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

const fetchComments = (id) => (dispatch) => {
    return fetch(`${server}/posts/${id}/comments`,
        {
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then( (res) => res.text() )
        .then( data => {
            data = JSON.parse(data);
            return dispatch(receiveComments(data, id))
        })
}

const updateCommentSuccess = (comment, id, parentId) => {
    return {
        type: UPDATE_COMMENT,
        comment,
        id,
        parentId
    }
}

const voteComment = (id, option, parentId) => (dispatch) => {
    return fetch(`${server}/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option: option }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => dispatch(updateCommentSuccess(data, id, parentId)))
}

const editComment = (id, payload) => (dispatch) => {
    return fetch(`${server}/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => dispatch(updateCommentSuccess(data, id, data.parentId)))
}

const createComment = (payload) => (dispatch) => {
    return fetch(`${server}/comments`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => {
        dispatch(fetchComments());
        dispatch(fetchPost(data.parentId));
    })
}

const deleteComment = (id) => (dispatch) => {
    return fetch(`${server}/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want' }
    })
    .then( res => res.json())
    .then( data => {
        dispatch(fetchComments(data.parentId));
        dispatch(fetchPost(data.parentId));
    })
}


export {
    fetchComments,
    voteComment,
    createComment,
    editComment,
    deleteComment
};
