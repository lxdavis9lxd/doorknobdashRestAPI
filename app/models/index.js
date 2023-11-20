const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.employees = require("./employees.model.js")(sequelize, Sequelize);
db.offices = require("./offices.model.js")(sequelize, Sequelize);
db.orders = require("./orders.model.js")(sequelize, Sequelize);
db.orderdetails = require("./orderdetails.model.js")(sequelize, Sequelize);
db.payments = require("./payments.model.js")(sequelize, Sequelize);
db.productlines = require("./productlines.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.SPKusers = require("./SPKusers.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);

module.exports = db;