import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import postsReducer from './posts';


export default combineReducers({
    categories: categoriesReducer,
    posts: postsReducer
});


/*
    posts: {
        {
            cat: [],
            cat2: []
        }
    }

*/

/*
    {
        categories: [],
        posts: [
            {

            }
        ]
    }
*/
