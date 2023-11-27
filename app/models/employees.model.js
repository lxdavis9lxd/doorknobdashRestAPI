module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employees', {
  
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmployeeNumber: {
      type: Sequelize.INTEGER,
      allowNull: false, 
      primaryKey: false
    },
    LastName: {
      type: Sequelize.STRING
    },
    FirstName: {
      type: Sequelize.STRING
    },
    Extension: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    OfficeCode: {
      type: Sequelize.STRING
    },
    Reportsto: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Jobtitle: {
      type: Sequelize.STRING
    },
    Phone: {
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
  
  
  return Employee;
};