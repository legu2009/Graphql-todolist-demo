import styled from 'react-emotion';
export const Group = styled('div')({
    marginBottom: '10px',
    maxWidth: '300px'
});
  
export const GroupLabel = styled('label')({
    marginBottom: '3px',
    lineHeight: '22px',
    fontSize: '15px',
    color: '#ccc'
});

export const GroupInput = styled('input')({
    display: 'block',
    width: '100%',
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