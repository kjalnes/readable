import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(rootReducer, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
