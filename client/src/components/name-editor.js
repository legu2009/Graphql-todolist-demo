import React, { Component, Fragment } from 'react';  
import { Mutation } from "react-apollo";  
import gql from 'graphql-tag';
import {Group, GroupLabel, GroupInput, GroupText} from './styled';  

const UPDATE_NAME = gql`
  mutation updateMyName($name: String!) {
    updateMyName(name: $name) {
      success
      message
      me {
        id
        name
        email
      }
    }
  }
`;

class NameEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: props.name
        }
    }

    nameChange = (event) => {
        this.setState({userName: event.target.value})
    }

    saveName = () => {
        this.props.doMutate && this.props.doMutate({
            variables: {
                name: this.state.userName
            }
        })
    }

    render() {
        return (
          <Fragment>
            <Group>
                <GroupLabel>Username</GroupLabel>
                <GroupInput value={this.state.userName} onChange={this.nameChange} onBlur={this.saveName}></GroupInput>
            </Group>
            <Group>
                <GroupLabel>Email</GroupLabel>
                <GroupText>{this.props.email}</GroupText>
            </Group>
          </Fragment>
        )
    }
}

export const NameEditorMutation = props => {  
   return(
       <Mutation mutation={UPDATE_NAME}>
           {(doMutate, { data })=>{
               return (<NameEditor doMutate={doMutate} {...props}/>)
           }}
       </Mutation>
   )
}

