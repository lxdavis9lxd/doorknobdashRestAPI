module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
 
    UserName: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Salt: {
        type: Sequelize.STRING
    },
    Createat: {
        type: Sequelize.STRING
    },
    UpDatesat: {
        type: Sequelize.STRING
    },
    CreatedBy: {
        type: Sequelize.STRING
    },
    ModifiedBy: {
        type: Sequelize.STRING
    },
    Key: {
        type: Sequelize.STRING
    },
    Role: {
        type: Sequelize.STRING
    }
});

return User;
};
