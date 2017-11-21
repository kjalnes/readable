import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


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

