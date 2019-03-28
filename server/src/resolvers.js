const { jwt } = require('./utils');
const { Authorize } = require('./decorator.js');
const { PubSub } = require('apollo-server');
const isEmail = require('isemail');

const pubsub = new PubSub();
const MEMBER_LEAVE = 'MEMBER_LEAVE';

var resolvers = {
    Query: {
        me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Subscription: {
        memberLeave: {
            subscribe: () => pubsub.asyncIterator([MEMBER_LEAVE])
        }
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            if (!email || !isEmail.validate(email)) {
                return {
                    code: -2,
                    success: false,
                    message: '邮箱格式不正确',
                    token: ''
                };
            }
            const user = await dataSources.userAPI.findOrCreateUser(email);
            if (user)
                return {
                    code: 0,
                    success: true,
                    message: '登陆成功',
                    token: jwt.sign({ email })
                };
            return {
                code: -3,
                success: false,
                message: '未知错误',
                token: ''
            };
        },
        @Authorize
        updateMyName: async (_, { name }, { dataSources }) => {
            await dataSources.userAPI.updateMyName(name);
            return {
                code: 0,
                success: true,
                message: '更新成功'
            };
        },
        @Authorize
        addWorkSpace: async (_, { name }, { dataSources }) => {
            const workSpace = await dataSources.workSpaceAPI.findOrCreateWorkSpace({ name });
            return {
                code: 0,
                success: true,
                message: '更新成功',
                workSpace: workSpace
            };
        },
        @Authorize
        updateWorkSpaceName: async (_, { WorkSpace }, { dataSources }) => {
            var res = await dataSources.workSpaceAPI.updateWorkSpaceName(WorkSpace);
            if (res[0]) {
                return {
                    code: 0,
                    success: true,
                    message: '更新成功',
                    workSpace: { id: WorkSpace.id }
                };
            } else {
                return {
                    code: -2,
                    success: false,
                    message: '更新失败',
                    workSpace: null
                };
            }
        },
        @Authorize
        deleteWorkSpace: async (_, { id }, { dataSources }) => {
            await dataSources.workSpaceAPI.deleteWorkSpace(id);
            return {
                code: 0,
                success: true,
                message: '删除成功'
            };
        },
        @Authorize
        addWorkSpaceMembers: async (_, { id, emails }, { dataSources }) => {
			emails = emails.filter(email => isEmail.validate(email));
            if (emails.length !== 0) {
                await dataSources.workSpaceAPI.addWorkSpaceMembers(id, emails);
            }
            return {
                code: 0,
                success: true,
                message: '更新成功',
                workSpace: { id }
            };
        },
        @Authorize
        deleteWorkSpaceMembers: async (_, { id, emails }, { dataSources }) => {
			//pubsub.publish(MEMBER_LEAVE, { memberLeave: { id, emails } });
			emails = emails.filter(email => isEmail.validate(email));
			if (emails.length !== 0) {
				await dataSources.workSpaceAPI.deleteWorkSpaceMembers(id, emails);
			}
            return {
                code: 0,
                success: true,
                message: '更新成功',
                workSpace: { id }
            };
        }
    },
    WorkSpace: {
        owner: async (workSpace, __, { dataSources }) => {
            return await dataSources.userAPI.getUserById(workSpace.userId);
        },
        members: async (workSpace, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getMembersById(workSpace.id);
        }
    },
    User: {
        myWorkSpaces: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getWorkSpacesByUser(_.id);
        },
        JoinedWorkSpaces: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getJoinedWorkSpacesByUser(_.id);
        }
    },
    UserResponse: {
        me: async (_, __, { dataSources }) => {
            return await dataSources.userAPI.getMe();
        }
    },
    WorkSpaceResponse: {
        workSpace: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getWorkSpaceById(_.workSpace.id);
        }
    }
};

module.exports = resolvers;
