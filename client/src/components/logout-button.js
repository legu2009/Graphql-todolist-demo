import React from 'react';
import styled from 'react-emotion';
import { ApolloConsumer } from 'react-apollo';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default function LogoutButton() {
  return (
    <ApolloConsumer>
      {client => (
        <StyledButton
          onClick={() => {
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.clear();
          }}
        >
          <ExitIcon />
          Logout
        </StyledButton>
      )}
    </ApolloConsumer>
  );
}

const StyledButton = styled('button')({
  background: 'none',
  border: 'none',
  padding: 0,
});