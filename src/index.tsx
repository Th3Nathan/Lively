import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Routes from './routes/index';
const App = <Routes />;

// Redux
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/index';
import { StoreState } from './redux/types/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
const middlewares = [thunk, createLogger];

const initialState = {
  modals: {
    NotificationsModal: {
      open: false
    }
  }
};

const store = createStore<StoreState>(reducers, initialState, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    {App}
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
