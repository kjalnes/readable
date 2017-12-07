import { RECEIVE_POSTS, UPDATE_POST, SET_CURRENT_POST } from '../constants';

const postsReducer = (state={}, action) => {
    switch(action.type) {
        case RECEIVE_POSTS:
            const posts = action.posts.reduce((_posts, post) => {
                _posts[post.category] ?
                _posts[post.category].push(post) :
                _posts[post.category] = [post]
                return _posts
            }, {});
            return {...state, posts: posts};
        case UPDATE_POST:
            let category = action.post.category;
            const updatedCategory = state.posts[category].map( _post => {
                return _post.id === action.post.id ? action.post : _post
            });

            return {...state,
                posts: {
                    ...state.posts,
                    [ category ]: updatedCategory
                },
                currentPost: action.post
            }
        case SET_CURRENT_POST:
            return {...state, currentPost: action.post}
        default:
            return state;
    }
}

export default postsReducer;
