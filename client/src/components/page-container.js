import React, { Fragment } from 'react';
import styled from 'react-emotion';

import { unit, colors } from '../styles';

export default function PageContainer(props) {
  return (
    <Fragment>
      <Container>{props.children}</Container>
    </Fragment>
  );
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  padding: unit * 3,
  paddingBottom: unit * 5,
});
