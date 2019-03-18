module.exports = {
  Query: {
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return {
        success: true,
        message: '更新成功',
        token: new Buffer(email).toString("base64")
      }; 
    },
    updateMyName: async (_, { name }, { dataSources }) => {
      const user = await dataSources.userAPI.updateNameByUser(name);
      return {
        success: true,
        message: '更新成功'
      };
    },
    addWorkSpace: async (_, { name }, { dataSources }) => {
      const workSpace = await dataSources.workSpaceAPI.findOrCreateWorkSpace({ name });
      console.log(workSpace.dataValues);
      return {
        success: true,
        message: '更新成功',
        workSpace: workSpace.dataValues
      };
    },
    updateWorkSpaceName: async (_, {WorkSpace}, { dataSources }) => {
      await dataSources.workSpaceAPI.updateWorkSpaceName(WorkSpace);
      return {
        success: true,
        message: '更新成功',
        workSpace: {id: WorkSpace.id}
      };
    },
    deleteWorkSpace: async (_, {id}, { dataSources }) => {
      await dataSources.workSpaceAPI.deleteWorkSpace(id);
      return {
        success: true,
        message: '删除成功'
      };
    },

    addWorkSpaceMembers: async (_, { id, emails }, { dataSources }) => {
      await dataSources.workSpaceAPI.addWorkSpaceMembers(id, emails);
      return {
        success: true,
        message: '更新成功',
        workSpace: {id}
      };
    },

    deleteWorkSpaceMembers: async (_, { id, emails }, { dataSources }) => {
      await dataSources.workSpaceAPI.deleteWorkSpaceMembers(id, emails);
      return {
        success: true,
        message: '更新成功',
        workSpace: {id}
      };
    },

  },
  WorkSpace: {
    owner: async (workSpace, __, { dataSources }) => {
      return await dataSources.userAPI.getUserById(workSpace.userId);
    },
    members: async (workSpace, __, { dataSources }) => {
      const users = await dataSources.workSpaceAPI.getMemberIdsById(
        workSpace.dataValues.id
      );
      const members = await dataSources.userAPI.getUserByIds(users.map(item => item.dataValues.userId));
      return members.map(item => item.dataValues);
    }
  },
  User: {
    workSpaces: async (_, __, { dataSources }) => {
      return await dataSources.workSpaceAPI.getWorkSpacesByUser();
    }
  },
  UserResponse: {
    me: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getMy();
    }
  },
  WorkSpaceResponse: {
    workSpace: async (_, __, { dataSources }) => {
      return await dataSources.workSpaceAPI.getWorkSpaceById(_.workSpace.id);
    }
  }
};
