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
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const apiUrl = 'https://lively-server.herokuapp.com/graphql';
const localUrl = 'http://localhost:8080/graphql';

const uri = process.env.NODE_ENV === 'production' ? apiUrl : localUrl;

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      ['x-token']: localStorage.getItem('token') || null,
      ['x-refresh-token']: localStorage.getItem('refreshToken') || null,
    } 
  });

  return forward!(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, new HttpLink({ uri })),
  cache: new InMemoryCache(),
});

const App =  (<ApolloProvider client={client as any}><Routes /></ApolloProvider>); // tslint:disable-line

ReactDOM.render(
  (<Provider store={store}>{App}</Provider>),
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
