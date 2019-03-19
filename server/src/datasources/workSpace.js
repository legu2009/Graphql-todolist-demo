const { DataSource } = require("apollo-datasource");

class WorkSpaceAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getWorkSpaceByIds(workSpaceIds) {
    return await this.store.workSpaces.findAll({
      where: { id: { $in: workSpaceIds } }
    });
  }

  async getMemberIdsById(workSpaceId) {
    return await this.store.members.findAll({
      where: { workSpaceId }
    });
  }

  async getWorkSpacesByUser() {
    const userId = this.context.user.id;
    return await this.store.workSpaces.findAll({
      where: { userId: userId }
    });
  }

  async getWorkSpaceById(id) {
    return await this.store.workSpaces.findOne({
      where: { id }
    });
  }

  async findOrCreateWorkSpace({ name }) {
    const userId = this.context.user.id;
    const workSpaces = await this.store.workSpaces.findOrCreate({ where: { name, userId: userId  } });
    return workSpaces && workSpaces[0] ? workSpaces[0] : null;
  }

  async updateWorkSpaceName({ id, name }) {
    const userId = this.context.user.id;
    return this.store.workSpaces.update({ name }, { where: { id: id, userId: userId } });
  }

  async deleteWorkSpace(id) {
    this.store.workSpaces.destroy({ where: { id }});
  }

  async addWorkSpaceMembers(id, emails) {
    var users = await this.deleteWorkSpaceMembers(id, emails);
    await this.store.members.bulkCreate(users.map(item => {
      return {
        workSpaceId: id,
        userId: item.dataValues.id
      }
    }));
  }

  async deleteWorkSpaceMembers(id, emails) {
    var users = await this.store.users.findAll({
      where: { email: { $in: emails } }
    });
    await this.store.members.destroy({ where: { workSpaceId: id, userId: { $in: users.map(item => item.dataValues.id) } }});
    return users;
  }

  

}

module.exports = WorkSpaceAPI;