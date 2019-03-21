import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import Loading from '../../components/loading';
import Header from '../../components/header';
import Detail from './detail.js';
import { GET_MY_PROFILE } from '../../components/page-container';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const MEMBER_LEAVE = gql`
    subscription memberLeave {
        memberLeave {
            id
            emails
        }
    }
`;

export default function Setting() {
    return (
        <Fragment>
            <Query query={GET_MY_PROFILE} fetchPolicy="network-only">
                {({ data, loading, error }) => {
                    if (loading) return <Loading />;
                    if (error) return <p>ERROR: {error.message}</p>;
                    return (
                        <Fragment>
                            <Header me={data.me} />
                            <Detail me={data.me} />
                        </Fragment>
                    );
                }}
            </Query>
            <Subscription
                subscription={MEMBER_LEAVE}
                onSubscriptionData={({ client, subscriptionData }) => {
                    var res = subscriptionData.data.memberLeave;
                    var email = res.emails[0];
                    var data = client.readQuery({ query: GET_MY_PROFILE });
                    var f = data.me.myWorkSpaces.find(x => x.id === res.id);
                    if (f && f.members) {
                        f.members.splice(f.members.findIndex(x => x.email === email), 1);
                    }
                    f = data.me.JoinedWorkSpaces.find(x => x.id === res.id);
                    if (f && f.members) {
                        f.members.splice(f.members.findIndex(x => x.email === email), 1);
                    }
                    client.writeQuery({ query: GET_MY_PROFILE, data });
                }}
            />
        </Fragment>
    );
}
