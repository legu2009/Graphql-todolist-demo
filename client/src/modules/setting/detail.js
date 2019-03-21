import React from 'react'
import styled from 'react-emotion'
import { unit } from '../../styles'
import AccountGroup from './account'
import MyWorkspaceGroup from './myWorkspaceGroup'
import JoinedWorkspaceGroup from './joinedWorkspaceGroup'

export default function Detail({ me }) {
    return (
        <Container>
            <AccountGroup me={me} />
            <MyWorkspaceGroup workSpaces={me.myWorkSpaces} />
            <JoinedWorkspaceGroup workSpaces={me.JoinedWorkSpaces} me={me} />
        </Container>
    )
}

const Container = styled('div')({
    borderRadius: '5px',
    boxShadow: '0 3px 2px 0 rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    padding: '10px',
    marginBottom: unit * 4.5
})
