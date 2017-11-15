// constants
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

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



export {
    RECEIVE_POSTS,
    fetchPosts,
};
