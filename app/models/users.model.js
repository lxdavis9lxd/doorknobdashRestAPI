module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    UserName: {
      type: Sequelize.STRING
    },
    Salt: {
      type: Sequelize.STRING
    },
    Key: {
      type: Sequelize.STRING
    },
    Role: {
      type: Sequelize.STRING
    },
    Employeenumber: {
      type: Sequelize.INTEGER
    },
    CreatedBy: {
      type: Sequelize.STRING
    },
    ModifiedBy: {
      type: Sequelize.STRING
    }
  });

  return Users;
};
