import React from 'react';
import ReactDOM from 'react-dom';
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { getMainDefinition } from 'apollo-utilities';
import Pages from './pages/index';
import Login from './pages/login';
import { resolvers, typeDefs } from './resolvers';
import injectStyles from './styles';
import { WebSocketLink } from 'apollo-link-ws';

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem('token')
        }
    }
});
const httpLink = new HttpLink({
	fetch(uri, options)  {
		options.headers.authorization = localStorage.getItem('token');
		return fetch(uri, options);
	},
    uri: 'http://localhost:4000/graphql'
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: split(
        // split based on operation type
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
    ),
    resolvers,
    typeDefs
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: []
    }
});

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN}>{({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}</Query>
    </ApolloProvider>,
    document.getElementById('root')
);
