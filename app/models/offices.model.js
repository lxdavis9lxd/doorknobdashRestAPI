module.exports = (sequelize, Sequelize) => {
  const Offices = sequelize.define('offices', {
    OfficeCode: {
      type: Sequelize.STRING
    },
    City: {
      type: Sequelize.STRING
    },
    Phone: {
      type: Sequelize.STRING
    },
    Addressline1: {
      type: Sequelize.STRING
    },
    Addressline2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    State: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Country: {
      type: Sequelize.STRING
    },
    PostalCode: {
      type: Sequelize.STRING
    },
    Territory: {
      type: Sequelize.STRING
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

  return Offices;
};
