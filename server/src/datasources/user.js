const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async getMy() {
    const user = this.context.user;
    return await this.store.users.findOne({
      where: { id: user.id }
    });
  }

  async updateNameByUser(name) {
    if (!this.context || !this.context.user) return false;
    const user = this.context.user;
    return this.store.users.update({ name }, { where: { id: user.id } });
  }

  async getUserById(id) {
    if (!this.context || !this.context.user) return false;
    return await this.store.users.findOne({
      where: { id }
    });
  }

  async getUserByIds(ids) {
    if (!this.context || !this.context.user) return false;
    return await this.store.users.findAll({
      where: { id: { $in: ids } }
    });
  }

  
}

module.exports = UserAPI;
