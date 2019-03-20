const { jwt } = require('./utils')
const { Authorize } = require('./decorator.js')

module.exports = {
    Query: {
        me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.findOrCreateUser({ email })
            if (user)
                return {
                    success: true,
                    message: '登陆成功',
                    token: jwt.sign({ email })
                }
            return {
                success: false,
                message: '邮箱格式不正确',
                token: ''
            }
        },
        updateMyName: Authorize(async (_, { name }, { dataSources }) => {
            await dataSources.userAPI.updateNameByUser(name)
            return {
                success: true,
                message: '更新成功'
            }
        }),
        addWorkSpace: Authorize(async (_, { name }, { dataSources }) => {
            const workSpace = await dataSources.workSpaceAPI.findOrCreateWorkSpace({ name })
            return {
                success: true,
                message: '更新成功',
                workSpace: workSpace.dataValues
            }
        }),
        updateWorkSpaceName: Authorize(async (_, { WorkSpace }, { dataSources }) => {
            var res = await dataSources.workSpaceAPI.updateWorkSpaceName(WorkSpace)
            if (res[0]) {
                return {
                    success: true,
                    message: '更新成功',
                    workSpace: { id: WorkSpace.id }
                }
            } else {
                return {
                    success: false,
                    message: '更新失败',
                    workSpace: null
                }
            }
        }),
        deleteWorkSpace: Authorize(async (_, { id }, { dataSources }) => {
            await dataSources.workSpaceAPI.deleteWorkSpace(id)
            return {
                success: true,
                message: '删除成功'
            }
        }),
        addWorkSpaceMembers: Authorize(async (_, { id, emails }, { dataSources }) => {
            await dataSources.workSpaceAPI.addWorkSpaceMembers(id, emails)
            return {
                success: true,
                message: '更新成功',
                workSpace: { id }
            }
        }),
        deleteWorkSpaceMembers: Authorize(async (_, { id, emails }, { dataSources }) => {
            await dataSources.workSpaceAPI.deleteWorkSpaceMembers(id, emails)
            return {
                success: true,
                message: '更新成功',
                workSpace: { id }
            }
        })
    },
    WorkSpace: {
        owner: async (workSpace, __, { dataSources }) => {
            return await dataSources.userAPI.getUserById(workSpace.userId)
        },
        members: async (workSpace, __, { dataSources }) => {
            const users = await dataSources.workSpaceAPI.getMemberIdsById(workSpace.dataValues.id)
            const members = await dataSources.userAPI.getUserByIds(users.map(item => item.dataValues.userId))
            return members.map(item => item.dataValues)
        }
    },
    User: {
        myWorkSpaces: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getWorkSpacesByUser()
		},
		JoinedWorkSpaces: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getJoinedWorkSpacesByUser()
		}
    },
    UserResponse: {
        me: async (_, __, { dataSources }) => {
            return dataSources.userAPI.getMy()
        }
    },
    WorkSpaceResponse: {
        workSpace: async (_, __, { dataSources }) => {
            return await dataSources.workSpaceAPI.getWorkSpaceById(_.workSpace.id)
        }
    }
}
