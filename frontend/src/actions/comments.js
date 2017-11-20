// constants
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

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
    .then( data => dispatch(fetchComments()))
}

const deleteComment = (id) => (dispatch) => {
    return fetch(`${server}/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want' }
    })
    .then( res => res.json())
    .then( data => dispatch(fetchComments(data.parentId)))
}


export {
    RECEIVE_COMMENTS,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    fetchComments,
    voteComment,
    createComment,
    editComment,
    deleteComment
};
