import styled, { injectGlobal } from 'react-emotion';
import space from './assets/images/bg.jpg';

export const unit = 8;
export const colors = {
    primary: '#220a82',
    secondary: '#14cbc4',
    accent: '#e535ab',
    background: '#f7f8fa',
    grey: '#d8d9e0',
    text: '#343c5a',
    textSecondary: '#747790',
    workSpaces: '#FF9900',
    member: '#0099FF',
    button: '#C89CFF'
};

export const Group = styled('div')({
    marginBottom: '10px',
    marginLeft: '12px',
    position: 'relative'
});

export const GroupLabel = styled('label')({
    marginBottom: '3px',
    lineHeight: '22px',
    fontSize: '15px',
    color: '#ccc'
});

export const GroupInput = styled('input')({
    display: 'block',
    width: '400px',
    height: 'calc(2.25rem + 2px)',
    padding: '.375rem .75rem',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    color: '#495057',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
    transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
});

export const GroupText = styled('div')({
    fontSize: '1rem',
    height: '24px',
    lineHeight: '24px',
    marginBottom: '1rem',
    color: '#666'
});

export const GroupMember = styled('span')({
    display: 'inline-block',
    height: '32px',
    lineHeight: '32px',
    backgroundColor: colors.member,
    color: 'white',
    padding: '0 10px',
    borderRadius: 5,
    marginRight: 10
});

export const GroupWorkSpaces = styled('span')({
    display: 'inline-block',
    height: '32px',
    lineHeight: '32px',
    backgroundColor: colors.workSpaces,
    color: 'white',
    padding: '0 10px',
    borderRadius: 5,
    marginRight: 10
});

export default () =>
    injectGlobal({
        [['html', 'body']]: {
            height: '100%'
        },
        body: {
            margin: 0,
            padding: 0,
            fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
            backgroundColor: colors.background,
            color: colors.text
        },
        '#root': {
            justifyContent: 'center',
            alignItems: 'flex-start',
            display: 'flex',
            minHeight: '100%',
            backgroundColor: '#f8f8f8',
            backgroundImage: `url(${space})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        },
        '*': {
            boxSizing: 'border-box'
        },
        [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
            margin: 0,
            fontWeight: 600
        },
        h1: {
            fontSize: 48,
            lineHeight: 1
        },
        h2: {
            fontSize: 40
        },
        h3: {
            fontSize: 36
        },
        h5: {
            fontSize: 16,
            textTransform: 'uppercase',
            letterSpacing: 4
        }
    });

//C89CFF
