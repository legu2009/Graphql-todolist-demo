const fetch = require('node-fetch');
const { Binding } = require('graphql-binding');
const { HttpLink } = require('apollo-link-http');
const { makeRemoteExecutableSchema } = require('graphql-tools');
//const { typeDefsStr } = require('./schema');
const endpoint = `http://localhost:4000`;
const link = new HttpLink({ uri: endpoint, fetch });
const typeDefsStr = `
type Mutation {
	login(email: String): LoginResponse!
}
type LoginResponse {
	success: Boolean!
	message: String!
	token: String!
}
`;
const schema = makeRemoteExecutableSchema({
    link,
    schema: typeDefsStr
});
class PostBinding extends Binding {
    constructor() {
        super({ schema });
    }
}
const postBinding = new PostBinding();
postBinding.mutation
    .login({ email: 'locker@qq.com' }, '{success, message, token}')
    .then(createUserResult => console.log(createUserResult));

/*
const { Delegate } = require('graphql-binding/dist/Delegate');
const before = () => console.log(`Sending a request to the GraphQL API ...`);
const delegate = new Delegate({ schema, before });

delegate
    .delegate(`mutation`, `login`, { email: 'locker@qq.com' }, '{success, message, token}')
    .then(createUserResult => console.log(createUserResult))
    .catch(e => {
        console.error(e);
	});
*/
