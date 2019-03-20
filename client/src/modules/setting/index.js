import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Loading, Header } from '../../components'
import Detail from './detail.js'
import {GET_MY_PROFILE} from '../../components/page-container'


export default function Setting() {
    return (
        <Query query={GET_MY_PROFILE} fetchPolicy="network-only">
            {({ data, loading, error }) => {
                if (loading) return <Loading />
                if (error) return <p>ERROR: {error.message}</p>
                return (
                    <Fragment>
                        <Header me={data.me} ></Header>
                        <Detail me={data.me} />
                    </Fragment>
                )
            }}
        </Query>
    )
}
