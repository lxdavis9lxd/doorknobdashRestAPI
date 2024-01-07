module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
  
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
