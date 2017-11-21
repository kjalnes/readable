import { RECEIVE_CATEGORIES } from '../constants';

const server = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// actions
const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

// action async method
const fetchCategories = () => (dispatch) => {
    return fetch(`${server}/categories`,
        {
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then( (res) => res.text() )
        .then( data => {
            data = JSON.parse(data).categories;
            return dispatch(receiveCategories(data))
        })
}

export { fetchCategories };
