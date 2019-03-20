import React, { Fragment } from 'react'
import styled from 'react-emotion'
import { unit, colors } from '../styles'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './loading'

export const GET_MY_PROFILE = gql`
    query me {
        me {
            id
            name
            email
            myWorkSpaces {
                id
                name
                members {
                    id
                    name
                    email
                }
            }
            JoinedWorkSpaces {
                id
                name
            }
        }
    }
`

export default function PageContainer(props) {
    return (
        <Fragment>
            <LeftMenu />
            <Container>{props.children}</Container>
        </Fragment>
    )
}

function LeftMenu() {
    return (
        <Query query={GET_MY_PROFILE} fetchPolicy="network-only">
            {({ data, loading, error }) => {
				console.log(data);
                if (loading) return <Loading />
                if (error) return <p>ERROR: {error.message}</p>
                return (
                    <Menu>
                        <MenuItem>Setting</MenuItem>
                        <MenuItem>My Workspace</MenuItem>
						{
							data.me.myWorkSpaces.map(item => <WorkSpacesItem>{item.name}</WorkSpacesItem>)
						}
                        <MenuItem>Join Workspace</MenuItem>
						{
							data.me.JoinedWorkSpaces.map(item => <WorkSpacesItem>{item.name}</WorkSpacesItem>)
						}
                    </Menu>
                )
            }}
        </Query>
    )
}

const MenuItem = styled('div')`
    width: 100%;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    padding: 0 ${unit * 3}px;
    transition: all ease-in-out 0.2s;
    color: #666;
    &:hover {
        background: #f4f4f4;
        color: #333;
    }
`

const WorkSpacesItem = styled('div')`
    width: 100%;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    padding: 0 ${unit * 6}px;
    transition: all ease-in-out 0.2s;
    color: #C89CFF;
    &:hover {
        background: #f4f4f4;
    }
`

const Menu = styled('div')({
    width: 270,
    fontSize: '16px',
    borderRadius: 5,
    boxShadow: '0 3px 2px 0 rgba(0,0,0,0.1)',
    background: '#ffffff',
    padding: `${unit * 3}px 0`,
    paddingBottom: unit * 5,
    marginTop: unit * 3
})

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: 800,
    padding: unit * 3,
    paddingBottom: unit * 5
})
