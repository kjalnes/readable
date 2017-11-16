// constants
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const UPDATE_POST = 'UPDATE_POST';

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
    return fetch(`${server}/posts`,
        {
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then( (res) => res.text() )
        .then( data => {
            data = JSON.parse(data);
            return dispatch(receivePosts(data))
        })
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
    // refetch updated posts
    .then( data => dispatch(fetchPosts()))
}

export {
    RECEIVE_POSTS,
    UPDATE_POST,
    fetchPosts,
    updatePost,
    deletePost
};
