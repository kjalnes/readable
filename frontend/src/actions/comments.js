// constants
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

const server = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

// app.get('/posts/:id/comments'
const fetchComments = (id) => (dispatch) => {
    // console.log('id', id)
    return fetch(`${server}/posts/${id}/comments`,
        {
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then( (res) => res.text() )
        .then( data => {
            console.log('data from fetchComments', data)
            data = JSON.parse(data);
            return dispatch(receiveComments(data, id))
        })
}
export {
    RECEIVE_COMMENTS,
    fetchComments
};
