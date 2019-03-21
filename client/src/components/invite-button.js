import newIcon from '../assets/images/invite.png'
import styled from 'react-emotion'
import React from 'react';

const StyledButton = styled('div')({
	backgroundImage: `url(${newIcon})`,
	backgroundSize: '100%',
	height: 28,
	width: 28,
	position: "absolute",
	cursor: "pointer",
	bottom: 6,
    left: 442
})

export default function AddButton(props) {
    return <StyledButton onClick={props.onClick} />
}
