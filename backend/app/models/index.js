const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tournament = require("../models/tournament.model.js")(sequelize, Sequelize);
db.userDetail = require("../models/userdetail.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.tournament.belongsToMany(db.user, {
  through: "user_tournaments"
});
db.user.belongsToMany(db.tournament, {
  through: "user_tournaments"
});

db.user.hasOne(db.userDetail);
db.userDetail.belongsTo(db.user);

db.ROLES = ["user", "admin"];

module.exports = db;
