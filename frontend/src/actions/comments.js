// constants
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

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
    .then( data => {
        return dispatch(updateCommentSuccess(data, id, parentId))
    })
}

const editComment = (id, payload) => (dispatch) => {
    console.log('id', id)
    console.log('payload', payload)
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
    .then( data => {
        // console.log('data from editComment in actions', data)
        return dispatch(updateCommentSuccess(data, id, data.parentId))
    })
}




const createComment = (payload) => (dispatch) => {
    console.log('payload', payload)
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
        return dispatch(fetchComments())
        // console.log('data from post comment', data)
    })
}

export {
    RECEIVE_COMMENTS,
    UPDATE_COMMENT,
    fetchComments,
    voteComment,
    createComment,
    editComment
};
