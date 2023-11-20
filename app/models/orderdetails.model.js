module.exports = (sequelize, Sequelize) => {
  const Orderdetails = sequelize.define('orderdetails', {
    Ordernumber: {
      type: Sequelize.INTEGER
    },
    ProductCode: {
      type: Sequelize.STRING
    },
    Quantityordered: {
      type: Sequelize.INTEGER
    },
    Priceeach: {
      type: Sequelize.FLOAT
    },
    Orderlinenumber: {
      type: Sequelize.INTEGER
    },
    CreatedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ModifiedBy: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Orderdetails;
};
