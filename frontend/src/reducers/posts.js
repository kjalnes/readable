import { RECEIVE_POSTS, UPDATE_POST } from '../actions/posts';

const postsReducer = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_POSTS:
            const postsObj = action.posts.reduce((obj, curr) => {
                if (obj[curr.category]) {
                    obj[curr.category].push(curr);
                } else {
                    obj[curr.category] = [curr];
                }
                return obj
            }, {})
            return postsObj;
        case UPDATE_POST:
            let category = action.post.category;
            const updatedCategory = state[category].map( post => {
                if(post.id === action.post.id) {
                    return action.post
                }
                return post
            })
            let res = Object.assign({}, state);
            res[category] = updatedCategory;
            return res
        default:
            return state;
    }
}

export default postsReducer;
