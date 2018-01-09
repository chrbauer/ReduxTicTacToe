import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { Repeat } from 'immutable';

import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { StoreState, FieldValue } from './state/types';
 
import { createLogger } from 'redux-logger'

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const loggerMiddleware = createLogger()

const store = createStore<StoreState>(x => x,
  {
     board: Repeat(FieldValue.Empty, 9).toList()
  }, applyMiddleware(
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
