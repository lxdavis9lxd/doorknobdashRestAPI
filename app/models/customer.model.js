module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Customer;
};
