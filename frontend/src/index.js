import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Posts from './components/Posts'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// is there a way to generate the routes for example categories dynamically here using data fetched from the backend ?



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();


// <BrowserRouter>
//     <Switch>
//     <Route path='/' component={App} />
//     <Route
//         title='react'
//         path='/react'
//         component={Posts} />
//     <Route
//         path='/:category'
//         component={Posts} />
//     </Switch>
// </BrowserRouter>








// console.log(store.getState())





// <Route
//     title='react'
//     path='/react'
//     component={Posts} />
// <Route
//     title='redux'
//     path='/redux'
//     component={Posts} />
