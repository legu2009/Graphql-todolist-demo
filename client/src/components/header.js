import React from 'react';
import styled from 'react-emotion';
import { size } from 'polished';
import { unit, colors } from '../styles';
import avatarImg from '../assets/images/avatar.jpg';
import LogoutButton from './logout-button';

export default function Header({ me: { name, email } }) {
    return (
        <Container>
            <Image round={true} src={avatarImg} />
            <div>
                <h2>{name || ''}</h2>
                <Subheading>{email}</Subheading>
            </div>
            <LogoutButton />
        </Container>
    );
}

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    boxShadow: '0 3px 2px 0 rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
	marginBottom: '10px',
	position: "relative"
});

const Image = styled('img')(size(134), props => ({
    padding: '12px',
    marginRight: unit * 1.5,
    borderRadius: props.round && '50%'
}));

const Subheading = styled('h5')({
    marginTop: unit / 2,
    color: colors.textSecondary
});
