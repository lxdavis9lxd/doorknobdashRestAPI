module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define('products', {
    ProductCode: {
      type: Sequelize.STRING
    },
    ProductName: {
      type: Sequelize.STRING
    },
    Productline: {
      type: Sequelize.STRING
    },
    Productscale: {
      type: Sequelize.STRING
    },
    Productvendor: {
      type: Sequelize.STRING
    },
    Productdescription: {
      type: Sequelize.STRING
    },
    Quantityinstock: {
      type: Sequelize.INTEGER
    },
    Buyprice: {
      type: Sequelize.FLOAT
    },
    Msrp: {
      type: Sequelize.FLOAT
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

  return Products;
};
