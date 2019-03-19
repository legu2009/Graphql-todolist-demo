import React, { Fragment } from 'react';
import styled from 'react-emotion';

import { unit, colors } from '../styles';

export default function PageContainer(props) {
  return (
    <Fragment>
      <MenuComponent />
      <Container>{props.children}</Container>
    </Fragment>
  );
}

function MenuComponent() {
  return <Menu>
    <MenuItem>Setting</MenuItem>
    <MenuItem>My Workspace</MenuItem>
    <MenuItem>Join Workspace</MenuItem>
  </Menu>
}

const MenuItem = styled('div')`
  width: 100%;
  height: 38px;
  line-height: 38px;
  cursor: pointer;
  padding: 0 ${unit * 3}px;
  transition: all ease-in-out .2s;
  color: #666;
  &:hover {
    background: #F4F4F4;
    color: #333;
  }
`;

const Menu = styled('div')({
  width: 270,
  fontSize: '16px',
  borderRadius: 5,
  boxShadow: '0 3px 2px 0 rgba(0,0,0,0.1)',
  background: '#ffffff',
  padding: `${unit * 3}px 0`,
  paddingBottom: unit * 5,
  marginTop: unit * 3,
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: 800,
  padding: unit * 3,
  paddingBottom: unit * 5,
});
