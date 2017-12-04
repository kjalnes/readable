import { RECEIVE_POSTS, UPDATE_POST, SET_CURRENT_POST } from '../constants';


const postsReducer = (state={}, action) => {
    switch(action.type) {
        case RECEIVE_POSTS:
            const posts = action.posts.reduce((obj, curr) => {
                obj[curr.category] ?
                obj[curr.category].push(curr) :
                obj[curr.category] = [curr]
                return obj
            }, {})
            return Object.assign({}, state, {posts: posts});
        case UPDATE_POST:
            let category = action.post.category;
            const updatedCategory = state.posts[category].map( post => {
                return post.id === action.post.id ? action.post : post
            })
            let newState = Object.assign({}, state, {currentPost: action.post});
            newState.posts[category] = updatedCategory;
            return newState
        case SET_CURRENT_POST:
            const isError = action.post.error;

            if (isError) {
                return state;
            }

            return Object.assign({}, state, {currentPost: action.post})
        default:
            return state;
    }
}

export default postsReducer;
