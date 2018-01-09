import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { StoreState } from './state/types';
 
import { createLogger } from 'redux-logger'

import registerServiceWorker from './registerServiceWorker';


import { rootReducer } from './state/reducers';

import './index.css';

const loggerMiddleware = createLogger()

const store = createStore<StoreState|undefined>(rootReducer, undefined, applyMiddleware(
     loggerMiddleware
   )
)
  

ReactDOM.render(
 <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
