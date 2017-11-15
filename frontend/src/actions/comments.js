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

/* maybe not necessary ? maybe rather fetch all the comments all over again after update? */

const updateCommentSuccess = (comment, id) => {
    return {
        type: UPDATE_COMMENT,
        comment,
        id
    }
}

//     method: 'post',
//     body: JSON.stringify({
//         email: document.getElementById('email').value,
//         answer: document.getElementById('answer').value
//     })
// });


const updateComment = (id, option) => (dispatch) => {
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
          return dispatch(updateCommentSuccess(data, id))
    })


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
export {
    RECEIVE_COMMENTS,
    UPDATE_COMMENT,
    fetchComments,
    updateComment
};
