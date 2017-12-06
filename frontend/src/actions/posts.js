import { RECEIVE_POSTS, UPDATE_POST, SET_CURRENT_POST } from '../constants';

const server = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// actions
const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

// action async method
const fetchPosts = () => (dispatch) => {
    return fetch(`${server}/posts`, {
            headers: { 'Authorization': 'whatever-you-want' }
        })
    .then( (res) => res.text() )
    .then( data => {
        data = JSON.parse(data);
        return dispatch(receivePosts(data))
    })
}

const setCurrentPost = (post) => {
    return {
        type: SET_CURRENT_POST,
        post
    }
}

const fetchPost = (id) => (dispatch) => {
    return fetch(`${server}/posts/${id}`, {
        headers: { 'Authorization': 'whatever-you-want' }
    })
    .then( (res) => res.text() )
    .then( data => {
        data = JSON.parse(data);
        return dispatch(setCurrentPost(data))
    });
}

const updatePostSuccess = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const updatePost = (id, option) => (dispatch) => {
    return fetch(`${server}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option: option }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => {
          return dispatch(updatePostSuccess(data, id))
    })
}

const deletePost = (id) => (dispatch) => {
    return fetch(`${server}/posts/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': 'whatever-you-want'}
    })
    .then( res => res.json())
    // refetch posts
    .then( data => dispatch(fetchPosts()))
}

const createPost = (payload) => (dispatch) => {
    return fetch(`${server}/posts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => dispatch(fetchPosts()))
}

const editPost = (id, payload) => (dispatch) => {
    return fetch(`${server}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then( res => res.json())
    .then( data => {
        dispatch(updatePostSuccess(data))
    })
}


export {
    fetchPosts,
    fetchPost,
    updatePost,
    deletePost,
    createPost,
    editPost
};
