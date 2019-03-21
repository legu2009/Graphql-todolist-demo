import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { EditorMutation } from '../../components/editor-mutation'
import { unit, Group, GroupLabel, GroupText } from '../../styles'
import styled from 'react-emotion'

const UPDATE_USERNAME = gql`
    mutation updateMyName($value: String!) {
        updateMyName(name: $value) {
            success
            message
            me {
                id
                name
                email
            }
        }
    }
`

export default function AccountGroup({ me }) {
    return (
        <Fragment>
            <Title>Account</Title>
            <EditorMutation value={me.name} mutation={UPDATE_USERNAME} label="Username" />
            <Group>
                <GroupLabel>Email</GroupLabel>
                <GroupText>{me.email}</GroupText>
            </Group>
        </Fragment>
    )
}

export const Title = styled('div')({
    position: 'relative',
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '10px'
})