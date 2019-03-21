import styled from 'react-emotion'
import React from 'react'
import close from '../assets/images/close.png'

const Mask = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
	background: 'rgba(0, 0, 0, 0.4)',
	zIndex: 9999
})
const Model = styled('div')({
    minWidth: '460px',
    boxShadow: '0 0 16px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.24)',
    background: 'white',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    position: 'absolute',
    fontSize: '15px',
    padding: '16px',
    maxWidth: '720px',
	borderRadius: '8px',
	
})
const Cross = styled('div')({
	position: "absolute",
    right: 10,
    cursor: 'pointer',
    background: `#fff url(${close}) no-repeat center center`,
    backgroundSize: '20px 20px',
    width: '16px',
	height: '21px',
	zIndex: 10
})

export default function Dialog(props) {
    if (!props.isShow) return null
    return (
        <Mask>
            <Model><Cross onClick={props.hide} />{props.children}</Model>
        </Mask>
    )
}
