const { DataSource } = require('apollo-datasource');
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

    async getMembersById(workSpaceId) {
        return await this.store.members
            .findAll({
                include: [this.store.users],
                where: { workSpaceId }
            })
            .map(item => item.user);
    }

    async getWorkSpacesByUser(userId) {
        return await this.store.workSpaces.findAll({
            where: { userId: userId }
        });
    }

    async getJoinedWorkSpacesByUser(userId) {
        return await this.store.members
            .findAll({
                where: { userId },
                include: [this.store.workSpaces]
            })
            .map(member => {
                return member.workSpace;
            });
    }

    async getWorkSpaceById(id) {
        return await this.store.workSpaces.findOne({
            where: { id }
        });
    }

    async findOrCreateWorkSpace({ name }) {
        const userId = this.context.user.id;
        const workSpaces = await this.store.workSpaces.findOrCreate({
            where: { name, userId: userId }
        });
        return workSpaces && workSpaces[0] ? workSpaces[0] : null;
    }

    async updateWorkSpaceName({ id, name }) {
        const userId = this.context.user.id;
        return this.store.workSpaces.update({ name }, { where: { id: id, userId: userId } });
    }

    async deleteWorkSpace(id) {
        await Promise.all([
            this.store.workSpaces.destroy({ where: { id } }),
            this.store.members.destroy({ where: { workSpaceId: id } })
        ]);
    }

    async addWorkSpaceMembers(id, emails) {
        const store = this.store;
        const workSpaces = await store.workSpaces.findOne({
            include: [
                {
                    model: store.members,
                    include: [
                        {
                            model: store.users,
                            where: { email: { $in: emails } }
                        }
                    ]
                }
            ],
            where: { id }
        });
        var users = await store.users.findAll({
            where: { email: { $in: emails } }
        });
        const map = {};
        workSpaces.members.forEach(member => {
            map[member.user.id] = 1;
        });
        users = users.filter(item => item.id !== workSpaces.userId && !map[item.id]);
        if (users.length > 0) {
            await this.store.members.bulkCreate(
                users.map(item => {
                    return {
                        workSpaceId: id,
                        userId: item.id
                    };
                })
            );
        }
    }

    async deleteWorkSpaceMembers(id, emails) {
        const users = await this.store.users.findAll({
            where: { email: { $in: emails } }
        });
        await this.store.members.destroy({
            where: {
                workSpaceId: id,
                userId: {
                    $in: users.map(item => item.id)
                }
            }
        });
        return users;
    }
}

module.exports = WorkSpaceAPI;
