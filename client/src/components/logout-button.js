import React from 'react';
import styled from 'react-emotion';
import { ApolloConsumer } from 'react-apollo';
import icon from '../assets/images/out.png';

export default function LogoutButton() {
    return (
        <ApolloConsumer>
            {client => (
                <StyledButton
                    onClick={() => {
                        client.writeData({ data: { isLoggedIn: false } });
                        localStorage.clear();
                    }}
                />
            )}
        </ApolloConsumer>
    );
}

const StyledButton = styled('div')({
    backgroundImage: `url(${icon})`,
    backgroundSize: '100%',
    height: 50,
    width: 50,
    marginLeft: 10,
    position: "absolute",
    right: 50,
    cursor: 'pointer'
});
