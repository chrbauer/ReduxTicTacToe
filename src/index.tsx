import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { List } from 'immutable';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StoreState, FieldValue } from './state/types';



import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore<StoreState>(x => x,
  {
     board: List<FieldValue>()
  }
)
  

ReactDOM.render(
 <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
