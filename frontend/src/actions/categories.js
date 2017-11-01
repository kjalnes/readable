import axios from 'axios';

// constants
const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

// actions
const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

const fetchCategories = () => (dispatch) => {
    fetch('http://localhost:3001/categories',
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then( (res) => {
        return res.text()
      })
      .then((data) => {
        let categories = JSON.parse(data).categories;
        dispatch(receiveCategories(categories))
      })
}


export {
    RECEIVE_CATEGORIES,
    fetchCategories,
    receiveCategories
};
