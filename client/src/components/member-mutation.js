import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Group, GroupLabel, GroupMember } from '../styles'

class Member extends Component {
    remove = value => {
        var variables = {
            value
        }
        if (this.props.getVariables) {
            variables = this.props.getVariables(value)
        }

        this.props.doMutate &&
            this.props.doMutate({
                variables
            })
    }

    render() {
        if (this.props.members.length == 0) return null
        return (
            <Group>
                <GroupLabel>{this.props.label || 'Members'}</GroupLabel>
                <div>
                    {this.props.members.map(item => (
                        <GroupMember key={item.id}>
                            {item.name || item.email} <span onClick={() => this.remove(item.email)}>X</span>
                        </GroupMember>
                    ))}
                </div>
            </Group>
        )
    }
}

export const MemberMutation = props => {
    let { mutation, onCompleted, update, ..._props } = props
    return (
        <Mutation mutation={mutation} onCompleted={onCompleted} update={update}>
            {(doMutate, { data }) => {
                return <Member doMutate={doMutate} {..._props} />
            }}
        </Mutation>
    )
}
