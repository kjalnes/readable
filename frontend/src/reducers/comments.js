import { RECEIVE_COMMENTS, UPDATE_COMMENT } from '../constants';

const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_COMMENTS:
        const commentsObj = action.comments.reduce((obj, curr) => {
                if (obj[curr.parentId]) {
                    obj[curr.parentId].push(curr);
                } else {
                    obj[curr.parentId] = [curr];
                }
                return obj
            }, {})
        return commentsObj
        case UPDATE_COMMENT:
            let parentId = action.parentId;
            const updatedComments = state[parentId].map( comment => {
                if(comment.id === action.id) {
                    return action.comment
                }
                return comment
            })
            let res = Object.assign({}, state);
            res[parentId] = updatedComments;
            return res
        default:
            return state;
    }
}

export default commentsReducer;
