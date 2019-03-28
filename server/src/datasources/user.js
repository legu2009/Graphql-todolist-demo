const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findOrCreateUser(email) {
		if (this.context.user && this.context.user.email) {
			email = email || this.context.user.email;
		}
		if (!email) return null;
        const users = await this.store.users.findOrCreate({ where: { email } });
        return users && users[0] ? users[0] : null;
    }

    async getMe() {
        const user = this.context.user;
        if (!user) return null;
        return await this.store.users.findOne({
            where: { id: user.id }
        });
    }

    async updateMyName(name) {
        const user = this.context.user;
        return this.store.users.update({ name }, { where: { id: user.id } });
    }

    async getUserById(id) {
        return await this.store.users.findOne({
            where: { id }
        });
    }

    async getUserByIds(ids) {
        return await this.store.users.findAll({
            where: { id: { $in: ids } }
        });
    }
}

module.exports = UserAPI;
