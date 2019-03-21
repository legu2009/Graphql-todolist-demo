import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Group, GroupLabel, GroupInput } from '../styles'

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    onChange = event => {
        this.setState({ value: event.target.value })
    }

    save = () => {
        var variables = {
            value: this.state.value
        }
        if (this.props.getVariables) {
            variables = this.props.getVariables(this.state.value)
		}
		if (this.state.value.length > 0) {
			this.props.doMutate &&
            this.props.doMutate({
                variables
            })
		}
    }

    render() {
        return (
            <Group>
                <GroupLabel>{this.props.label}</GroupLabel>
                <GroupInput value={this.state.value} onChange={this.onChange} onBlur={this.save} />
				{this.props.children}
            </Group>
        )
    }
}

export const EditorMutation = props => {
    let { mutation, onCompleted, update, ..._props } = props
    return (
        <Mutation mutation={mutation} onCompleted={onCompleted} update={update}>
            {(doMutate, { data }) => {
                return <Editor doMutate={doMutate} {..._props} />
            }}
        </Mutation>
    )
}
