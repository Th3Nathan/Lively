import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

// Redux
import { createStore } from 'redux';
import reducers from './redux/reducers/index';
import { StoreState } from './redux/types/index';
import { Provider } from 'react-redux';

const initialState = {
  modals: {
    NotificationsModal: {
      open: false
    }
  }
};

const store = createStore<StoreState>(reducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
