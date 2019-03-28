const sequelize = require('sequelize');
const JsonWebToken = require('JsonWebToken');
const jwt_key = 'graphql-todolist-demo';

module.exports.jwt = {
    sign(data) {
        return JsonWebToken.sign(data, jwt_key, { expiresIn: '1d' });
    },
    verify(token) {
        return JsonWebToken.verify(token, jwt_key);
    }
};

module.exports.createStore = () => {
    const Op = sequelize.Op;
    const operatorsAliases = {
        $in: Op.in
    };

    const db = new sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases,
        logging: true
    });

    const users = db.define('users', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: sequelize.STRING,
        email: sequelize.STRING
    });

    const workSpaces = db.define('workSpace', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: sequelize.STRING,
        userId: {
            type: sequelize.INTEGER
        }
    });

    const members = db.define('member', {
        workSpaceId: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        userId: {
            type: sequelize.INTEGER,
            primaryKey: true
        }
    });

    users.hasMany(workSpaces);
    workSpaces.belongsTo(users, { foreignKey: 'userId' });
    workSpaces.hasMany(members, { foreignKey: 'workSpaceId', targetKey: 'id' });

    members.belongsTo(users, { foreignKey: 'userId' });
    members.belongsTo(workSpaces, { foreignKey: 'workSpaceId', targetKey: 'id' });

    members.removeAttribute('id');

    return { users, workSpaces, members };
};

/*
const { createStore, jwt } = require('./utils');
const store = createStore();

store.users.findAll({ include: [store.workSpaces] }).then(data => {
    console.log(JSON.stringify(data));
});

store.workSpaces.findAll({ include: [store.users] }).then(data => {
    console.log(JSON.stringify(data));
});

store.workSpaces.findAll({ include: [store.members] }).then(data => {
    console.log(JSON.stringify(data));
});

store.workSpaces
    .findAll({
        include: [{ model: store.members, include: [store.users] }, store.users]
    })
    .then(data => {
        console.log(JSON.stringify(data));
    });
*/
