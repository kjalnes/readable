import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import postsReducer from './posts';
import commentsReducer from './comments';

export default combineReducers({
    categories: categoriesReducer,
    postData: postsReducer,
    comments: commentsReducer
});
