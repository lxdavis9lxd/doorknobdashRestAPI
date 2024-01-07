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

db.address = require("./address.model.js")(sequelize, Sequelize);
db.country = require("./country.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.customeraddress = require("./customeraddress.model.js")(sequelize, Sequelize);
db.foodorder = require("./foodorder.model.js")(sequelize, Sequelize);
db.deliverdriver = require("./deliverdriver.model.js")(sequelize, Sequelize);
db.menuitem = require("./menuitem.model.js")(sequelize, Sequelize);
db.ordermenuitem = require("./ordermenuitem.model.js")(sequelize, Sequelize);
db.orderstatus = require("./orderstatus.model.js")(sequelize, Sequelize);
db.restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;