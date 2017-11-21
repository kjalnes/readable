import { RECEIVE_CATEGORIES } from '../constants';

const categoriesReducer = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_CATEGORIES:
            return [...action.categories];
        default:
            return state;
    }
}

export default categoriesReducer;
