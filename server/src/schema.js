const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String): LoginResponse!
    updateMyName(name: String!): UserResponse!

    addWorkSpace(name: String!): WorkSpaceResponse!
    updateWorkSpaceName(WorkSpace: WorkSpaceNameInput!): WorkSpaceResponse!
    deleteWorkSpace(id: ID!): DeleteResponse!

    addWorkSpaceMembers(id: ID!, emails: [String!]!): WorkSpaceResponse!
    deleteWorkSpaceMembers(id: ID!, emails: [String!]!): WorkSpaceResponse!

  }

  type User {
    id: ID!
    email: String
    name: String
    workSpaces: [WorkSpace]!
  }

  type WorkSpace {
    id: ID!
    name: String!
    owner: User!
    members: [User]!
  }

  input WorkSpaceNameInput {
    id: ID!
    name: String!
  }

  interface Response {
    success: Boolean!
    message: String!
  }

  type DeleteResponse implements Response {
    success: Boolean!
    message: String!
  }

  type LoginResponse implements Response {
    success: Boolean!
    message: String!
    token: String!
  }

  type UserResponse implements Response {
    success: Boolean!
    message: String!
    me: User
  }

  type WorkSpaceResponse implements Response {
    success: Boolean!
    message: String!
    workSpace: WorkSpace
  }

`;

module.exports = typeDefs;
