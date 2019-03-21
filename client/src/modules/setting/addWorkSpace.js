import React, { Fragment, Component } from 'react';
import gql from 'graphql-tag';
import { EditorMutation } from '../../components/editor-mutation';
import AddButton from '../../components/add-button';
import Dialog from '../../components/dialog';
import { GET_MY_PROFILE } from '../../components/page-container';

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
`;

export default class AddWorkSpace extends Component {
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
                <AddButton onClick={this.showAddDlg} />
                <Dialog isShow={this.state.isShow} hide={this.hide}>
                    <EditorMutation
                        value={this.state.name}
                        mutation={ADD_WORKSPACE}
                        label="WorkspaceName"
                        onCompleted={res => {
                            this.setState({ isShow: false, name: '' });
                        }}
                        update={(
                            proxy,
                            {
                                data: {
                                    addWorkSpace: { workSpace }
                                }
                            }
                        ) => {
                            const data = proxy.readQuery({ query: GET_MY_PROFILE });
                            workSpace.members = [];
                            data.me.myWorkSpaces.push(workSpace);
                            proxy.writeQuery({ query: GET_MY_PROFILE, data });
                        }}
                    />
                </Dialog>
            </Fragment>
        );
    }
}
