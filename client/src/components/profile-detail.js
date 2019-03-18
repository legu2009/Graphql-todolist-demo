import React from 'react';
import styled from 'react-emotion';
import { NameEditorMutation } from './name-editor';
import { unit, colors } from '../styles';

export default function Detail({ me }) {
  return (
    <Container>
        <Title>Account</Title>
        <NameEditorMutation name={me.name} email={me.email}></NameEditorMutation>
        <Title>My Workspace</Title>
        <Title>Joined Workspace</Title>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  borderRadius: '5px',
  boxShadow: '0 3px 2px 0 rgba(0, 0, 0, 0.1)',
  background: '#ffffff',
  padding: '10px',
  marginBottom: unit * 4.5,
});


const Title = styled('div')({
    fontSize: '22px',
    lineHeight: '28px',
    marginBottom: '10px'
});

