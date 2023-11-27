
    module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("orders", {
      ordernumber: {
        type: Sequelize.INTEGER
      },
      OrderDate: {
        type: Sequelize.STRING
      },
      RequiredDate: {
        type: Sequelize.STRING
      },
      ShippedDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Status: {
        type: Sequelize.STRING
      },
      Comments: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Customernumber: {
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

    return Orders;
  };
