import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// @ts-ignore
import { initStore } from './store';
// @ts-ignore
import App from './components/App';

const store = initStore();

/**
 * Render React application
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </ Provider>,
    document.getElementById('application')
);