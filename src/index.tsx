import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StoreState, Optional } from './state/types';

// Middlewares
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import { rootReducer } from './state/reducers';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const loggerMiddleware = createLogger();

const store = createStore<Optional<StoreState>>(rootReducer, undefined, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
));

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
