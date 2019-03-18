import React, { Component } from 'react';  
import { Mutation } from "react-apollo";  
import styled from 'react-emotion';
import gql from 'graphql-tag';
import {Group, GroupLabel, GroupInput, GroupText} from './styled';  

const UPDATE_NAME = gql`
  mutation updateWorkSpaceName($name: String!) {
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
          <WorkspaceItem>

          </WorkspaceItem>
        )
    }
}


export const NameEditorMutation = ({name})=>{  
   return(
       <Mutation mutation={UPDATE_NAME}>
           {(doMutate, { data })=>{
               return (<NameEditor doMutate={doMutate} name={name} />)
           }}
       </Mutation>
   )
}



const WorkspaceItem = styled('div')({
  display: 'block',
  width: '100%',
  height: 'calc(2.25rem + 2px)',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #ced4da',
  borderRadius: '.25rem',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
});