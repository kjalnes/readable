import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;


// only include redux-immutable-state-invariant in dev mode

// const middleware = process.env.NODE_ENV !== 'production' ?
  // [require('redux-immutable-state-invariant').default(), thunk] :
  // [thunk];

const middleware = [thunk]

if (reduxDevtools) {
    store = createStore(rootReducer, reduxDevtools(applyMiddleware(...middleware)));
} else {
    store = createStore(rootReducer, applyMiddleware(...middleware));
}

export default store;
