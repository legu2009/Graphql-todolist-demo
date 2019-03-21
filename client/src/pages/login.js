import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { Loading } from '../components';
import LoginForm from '../modules/login/login-form';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export const LOGIN_USER = gql`
    mutation login($email: String!) {
        login(email: $email) {
            token
        }
    }
`;

export default function Login() {
    return (
        <ApolloConsumer>
            {client => (
                <Mutation
                    mutation={LOGIN_USER}
                    onCompleted={({ login: { token } }) => {
                        localStorage.setItem('token', token);
                        client.writeData({ data: { isLoggedIn: true } });
						window.location.reload();
                    }}
                >
                    {(login, { loading, error }) => {
                        if (loading) return <Loading />;
                        if (error) return <p>An error occurred</p>;
                        return <LoginForm login={login} />;
                    }}
                </Mutation>
            )}
        </ApolloConsumer>
    );
}
