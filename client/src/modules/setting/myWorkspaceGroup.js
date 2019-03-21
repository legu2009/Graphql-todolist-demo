import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { EditorMutation } from '../../components/editor-mutation';
import { MemberMutation } from '../../components/member-mutation';
import DelButton from '../../components/del-button';
import { GET_MY_PROFILE } from '../../components/page-container';
import { ApolloConsumer } from 'react-apollo';
import { Title } from './account';
import AddWorkSpace from './addWorkSpace';
import InviteWorkSpace from './inviteWorkSpace';

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
`;

const DELETE_WORKSPACE = gql`
    mutation deleteWorkSpace($id: ID!) {
        deleteWorkSpace(id: $id) {
            success
            message
        }
    }
`;

export const REMOVE_WORKSPACE_MEMBER = gql`
    mutation deleteWorkSpaceMembers($id: ID!, $value: [String!]!) {
        deleteWorkSpaceMembers(id: $id, emails: $value) {
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

export default function MyWorkspaceGroup({ workSpaces }) {
    return (
        <Fragment>
            <Title>
                My Workspace
                <AddWorkSpace />
            </Title>
            {workSpaces.map(item => (
                <Fragment key={item.id}>
                    <EditorMutation
                        key={item.id}
                        label="Workspace Name"
                        value={item.name}
                        mutation={UPDATE_WS_NAME}
                        getVariables={function(value) {
                            return {
                                ipt: {
                                    id: item.id,
                                    name: value
                                }
                            };
                        }}
                    >
                        <ApolloConsumer>
                            {client => (
                                <DelButton
                                    onClick={() => {
                                        client.mutate({
                                            mutation: DELETE_WORKSPACE,
                                            variables: {
                                                id: item.id
                                            },
                                            update: proxy => {
                                                const data = proxy.readQuery({ query: GET_MY_PROFILE });
                                                var workSpaces = data.me.myWorkSpaces;
                                                workSpaces.splice(workSpaces.findIndex(x => x.id === item.id), 1);
                                                proxy.writeQuery({ query: GET_MY_PROFILE, data });
                                            }
                                        });
                                    }}
                                />
                            )}
                        </ApolloConsumer>
                        <InviteWorkSpace workSpaceId={item.id} />
                    </EditorMutation>
                    <MemberMutation
                        mutation={REMOVE_WORKSPACE_MEMBER}
                        members={item.members}
                        getVariables={value => ({
                            id: item.id,
                            value: [value]
                        })}
                    />
                </Fragment>
            ))}
        </Fragment>
    );
}
