import { RECEIVE_COMMENTS, UPDATE_COMMENT } from '../actions/comments';


const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return [...action.comments];
        case UPDATE_COMMENT:
            return state.map( comment => {
                if(comment.id === action.id) {
                    return Object.assign({}, action.comment)
                }
                return comment
            })
        default:
            return state;
    }
}

export default commentsReducer;
