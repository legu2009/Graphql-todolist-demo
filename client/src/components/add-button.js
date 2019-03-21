import icon from '../assets/images/new.png'
import styled from 'react-emotion'
import React from 'react';

const StyledButton = styled('div')({
	display: 'inline-block',
	backgroundImage: `url(${icon})`,
	backgroundSize: '100%',
	height: 22,
	width: 22,
	marginLeft: 10,
	position: "relative",
	top: 4,
	cursor: "pointer"
})

export default function AddButton(props) {
    return <StyledButton onClick={props.onClick} />
}
