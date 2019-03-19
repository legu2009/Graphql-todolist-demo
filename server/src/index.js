const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore, jwt } = require('./utils');

const WorkSpaceAPI = require('./datasources/workSpace');
const UserAPI = require('./datasources/user');

const store = createStore();

const dataSources = () => ({
  workSpaceAPI: new WorkSpaceAPI({ store }),
  userAPI: new UserAPI({ store }),
});

const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  try {
      const data = jwt.verify(auth);
      if (new Date()/1000 > data.exp) {
        return  { user: null };
      }
      const user = await store.users.findOne({
        where: { email: data.email }
      });
      if (user) {
        return { user: { ...user.dataValues } };
      } 
      return  { user: null };
  }
  catch(err) {
      return  { user: null };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  formatError: error => {
    //console.log(error);
    return new Error('Internal server error');
    //delete error.extensions.exception;
    //return error;
  },
});

if (process.env.NODE_ENV !== 'test')
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  store,
  server,
};
