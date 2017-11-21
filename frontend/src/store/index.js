import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

const middleware = [thunk]

if (reduxDevtools) {
    store = createStore(rootReducer, reduxDevtools(applyMiddleware(...middleware)));
} else {
    store = createStore(rootReducer, applyMiddleware(...middleware));
}

export default store;
