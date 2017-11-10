import { RECEIVE_POSTS } from '../actions/posts';

const sortPosts = (posts) => {
    for(var post in posts) {
        posts[post] = posts[post].sort((a,b) => b.voteScore - a.voteScore);
    }
    return posts;
}

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
            return sortPosts(postsObj)
        default:
            return state;
    }
}

export default postsReducer;
