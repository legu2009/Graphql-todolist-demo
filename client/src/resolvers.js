import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }

  extend type Mutation {
    
  }
`;

export const resolvers = {
  Mutation: {

  }
};
