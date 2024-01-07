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

db.tutorials = require("./address.model.js")(sequelize, Sequelize);
db.customers = require("./country.model.js")(sequelize, Sequelize);
db.employees = require("./customer.model.js")(sequelize, Sequelize);
db.offices = require("./customeraddress.model.js")(sequelize, Sequelize);
db.orders = require("./foodorder.model.js")(sequelize, Sequelize);
db.orders = require("./deliverdriver.model.js")(sequelize, Sequelize);
db.orderdetails = require("./menuitem.model.js")(sequelize, Sequelize);
db.payments = require("./ordermenuitem.model.js")(sequelize, Sequelize);
db.productlines = require("./orderstatus.model.js")(sequelize, Sequelize);
db.products = require("./restaurant.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;