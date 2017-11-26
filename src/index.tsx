import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

import { createStore } from 'redux';
import { notificationsModal } from './reducers/index';
import { StoreState } from './types/index';
import { Provider } from 'react-redux';

const initialState = {
  modals: {
    NotificationsModal: {
      open: false
    }
  }
}

const store = createStore<StoreState>(notificationsModal, initialState);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
