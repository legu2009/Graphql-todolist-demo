const SQL = require("sequelize");

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: true
  });

  const users = db.define("users", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: SQL.STRING,
    email: SQL.STRING,
    token: SQL.STRING
  });

  const workSpaces = db.define("workSpace", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: SQL.STRING,
    userId: SQL.INTEGER
  });

  const members = db.define("member", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    workSpaceId: SQL.STRING,
    userId: SQL.INTEGER
  });

  
  return { users, workSpaces, members };
};
