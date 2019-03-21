import icon from '../assets/images/delete.png';
import styled from 'react-emotion';
import React from 'react';

const StyledButton = styled('div')({
    backgroundImage: `url(${icon})`,
    backgroundSize: '100%',
    height: 22,
    width: 22,
    position: 'absolute',
    cursor: 'pointer',
    bottom: 8,
    left: 412
});

export default function DelButton(props) {
    return <StyledButton onClick={props.onClick} />;
}
