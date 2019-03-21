import React, { Fragment } from 'react';
import { Title } from './account';
import { Group, GroupLabel, GroupWorkSpaces } from '../../styles';
import { REMOVE_WORKSPACE_MEMBER } from './myWorkspaceGroup';
import { ApolloConsumer } from 'react-apollo';
import { GET_MY_PROFILE } from '../../components/page-container';

function LeaveBtn({ workSpaces, me }) {
    return (
        <ApolloConsumer>
            {client => (
                <span
                    onClick={() => {
                        client.mutate({
                            mutation: REMOVE_WORKSPACE_MEMBER,
                            variables: {
                                id: workSpaces.id,
                                value: [me.email]
                            },
                            update: proxy => {
                                const data = proxy.readQuery({ query: GET_MY_PROFILE });
                                var JoinedWorkSpaces = data.me.JoinedWorkSpaces;
                                JoinedWorkSpaces.splice(JoinedWorkSpaces.findIndex(x => x.id === workSpaces.id), 1);
                                proxy.writeQuery({ query: GET_MY_PROFILE, data });
                            }
                        });
                    }}
                >
                    X
                </span>
            )}
        </ApolloConsumer>
    );
}

export default function JoinedWorkspaceGroup({ workSpaces, me }) {
    return (
        <Fragment>
            <Title>Joined Workspace</Title>
            <Group>
                <GroupLabel>Workspace Name</GroupLabel>
                <div>
                    {workSpaces.map(item => (
                        <GroupWorkSpaces key={item.id}>
                            {item.name} <LeaveBtn workSpaces={item} me={me} />
                        </GroupWorkSpaces>
                    ))}
                </div>
            </Group>
        </Fragment>
    );
}
