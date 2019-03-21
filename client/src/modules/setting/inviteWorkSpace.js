import React, { Fragment, Component } from 'react';
import gql from 'graphql-tag';
import { EditorMutation } from '../../components/editor-mutation';
import InviteButton from '../../components/invite-button';
import Dialog from '../../components/dialog';

const INVITE_WORKSPACE = gql`
    mutation addWorkSpaceMembers($id: ID!, $value: [String!]!) {
        addWorkSpaceMembers(id: $id, emails: $value) {
            success
            message
            workSpace {
                id
                name
                members {
                    id
                    name
                    email
                }
            }
        }
    }
`;

export default class InviteWorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            name: ''
        };
    }

    showAddDlg = () => {
        this.setState({ isShow: true, name: '' });
    };

    hide = () => {
        this.setState({ isShow: false, name: '' });
    };

    render() {
        return (
            <Fragment>
                <InviteButton onClick={this.showAddDlg} />
                <Dialog isShow={this.state.isShow} hide={this.hide}>
                    <EditorMutation
                        value={this.state.name}
                        mutation={INVITE_WORKSPACE}
                        label="email"
                        onCompleted={res => {
                            this.setState({ isShow: false, name: '' });
                        }}
                        getVariables={value => ({
                            id: this.props.workSpaceId,
                            value: [value]
                        })}
                    />
                </Dialog>
            </Fragment>
        );
    }
}
