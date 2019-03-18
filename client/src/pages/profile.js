import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading, Header, ProfileDetail } from '../components';

export const GET_MY_PROFILE = gql`
  query me {
    me{
      id
      name
      email
      workSpaces {
        id
        name
        members{
          id
          name
          email
        }
      }
    }
  }
`;

export default function Profile() {
  return (
    <Query query={GET_MY_PROFILE} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR: {error.message}</p>;
        return (
          <Fragment>
            <Header>{data.me.name||'unset'}</Header>
            <ProfileDetail me={data.me} />
          </Fragment>
        );
      }}
    </Query>
  );
}
