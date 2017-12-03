import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

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

// Apollo 
import Routes from './routes/index';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache(),
});

const App =  (<ApolloProvider client={client as any}><Routes /></ApolloProvider>);

ReactDOM.render(
  (<Provider store={store}>{App}</Provider>),
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
