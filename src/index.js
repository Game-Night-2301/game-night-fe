import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';

const link = createHttpLink({
  uri: 'https://game-night-backend-172o.onrender.com/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

persistCache({
  cache: client.cache,
  storage: window.localStorage,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>
);

reportWebVitals();
