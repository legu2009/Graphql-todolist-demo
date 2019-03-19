import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import styled from "react-emotion";
import gql from "graphql-tag";
import { Group, GroupLabel, GroupInput, GroupText } from "./styled";

const UPDATE_NAME = gql`
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

class NameEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  nameChange = event => {
    this.setState({ name: event.target.value });
  };

  saveName = () => {
    this.props.doMutate &&
      this.props.doMutate({
        variables: {
          ipt: {
            id: this.props.id,
            name: this.state.name
          }
        }
      });
  };

  render() {
    return (
      <Group>
        <GroupLabel>Workspace Name</GroupLabel>
        <GroupInput
          value={this.state.name}
          onChange={this.nameChange}
          onBlur={this.saveName}
        />
      </Group>
    );
  }
}



export const NameEditorMutation = props => {
  return (
    <Mutation mutation={UPDATE_NAME}>
      {(doMutate, { data }) => {
        return <NameEditor doMutate={doMutate} {...props} />;
      }}
    </Mutation>
  );
};


export const MemberMutation = props => {
  return (
    <Mutation mutation={UPDATE_NAME}>
      {(doMutate, { data }) => {
        return <NameEditor doMutate={doMutate} {...props} />;
      }}
    </Mutation>
  );
};


export const WorkspaceList = props => {
  return props.workSpaces.map(item => (
    <NameEditorMutation name={item.name} id={item.id} />
  ));
};

/*const WorkspaceItem = styled('div')({
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
});*/
