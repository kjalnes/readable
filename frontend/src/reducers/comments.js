import { RECEIVE_COMMENTS } from '../actions/comments';

// const sortPosts = (posts) => {
//     for(var post in posts) {
//         posts[post] = posts[post].sort((a,b) => b.voteScore - a.voteScore);
//     }
//     return posts;
// }


const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_COMMENTS:
            console.log('state', state)
            console.log('action', action)
            return action.comments
        default:
            return state;
    }
}

export default commentsReducer;
