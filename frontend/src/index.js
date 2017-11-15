import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// is there a way to generate the routes for example categories dynamically here using data fetched from the backend ?

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route component={App} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

