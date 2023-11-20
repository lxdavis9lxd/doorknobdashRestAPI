module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
    Customernumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ContactlastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ContactfirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Addressline1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Addressline2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    City: {
      type: Sequelize.STRING,
      allowNull: false
    },
    State: {
      type: Sequelize.STRING,
      allowNull: true
    },
    PostalCode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Salesrepemployeenumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Creditlimit: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Fax: {
      type: Sequelize.STRING,
      allowNull: true
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
  
  
    return Customer;
  };