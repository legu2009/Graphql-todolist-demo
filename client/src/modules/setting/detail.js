import React, { Fragment, Component } from 'react'
import styled from 'react-emotion'
import gql from 'graphql-tag'
import { EditorMutation } from '../../components/editor-mutation'
import AddButton from '../../components/add-button'
import Dialog from '../../components/dialog'
import { unit, Group, GroupLabel, GroupText } from '../../styles'

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

function AccountGroup({ me }) {
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

const UPDATE_WS_NAME = gql`
    mutation updateWorkSpaceName($ipt: WorkSpaceNameInput!) {
        updateWorkSpaceName(WorkSpace: $ipt) {
            success
            message
            workSpace {
                id
                name
            }
        }
    }
`

const ADD_WORKSPACE = gql`
    mutation addWorkSpace($value: String!) {
        addWorkSpace(name: $value) {
            success
            message
            workSpace {
                id
                name
            }
        }
    }
`

class MyWorkspaceGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            name: ''
        }
    }

    showAddDlg = () => {
        this.setState({ isShow: true, name: '' })
	}
	
	hide = () => {
        this.setState({ isShow: false, name: '' })
	}
	

    render() {
        var workSpaces = this.props.workSpaces
        return (
            <Fragment>
                <Title>
                    My Workspace
                    <AddButton onClick={this.showAddDlg} />
                </Title>
                <Dialog isShow={this.state.isShow} hide={this.hide}>
                    <EditorMutation
                        value={this.state.name}
                        mutation={ADD_WORKSPACE}
                        label="WorkspaceName"
                        onCompleted={res => {
                            this.setState({ isShow: false, name: '' })
                        }}
                    />
                </Dialog>
                {workSpaces.map(item => (
                    <EditorMutation
                        label="Workspace Name"
                        value={item.name}
                        mutation={UPDATE_WS_NAME}
                        getVariables={function(value) {
                            return {
                                ipt: {
                                    id: item.id,
                                    name: value
                                }
                            }
                        }}
                    />
                ))}
            </Fragment>
        )
    }
}

function JoinedWorkspaceGroup({ workSpaces }) {
    return (
        <Fragment>
            <Title>Joined Workspace</Title>
            {workSpaces.map(item => (
                <Group>
                    <GroupLabel>Workspace Name</GroupLabel>
                    <GroupText>{item.name}</GroupText>
                </Group>
            ))}
        </Fragment>
    )
}

export default function Detail({ me }) {
    return (
        <Container>
            <AccountGroup me={me} />
            <MyWorkspaceGroup workSpaces={me.myWorkSpaces} />
            <JoinedWorkspaceGroup workSpaces={me.JoinedWorkSpaces} />
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

const Title = styled('div')({
    position: 'relative',
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '10px'
})
