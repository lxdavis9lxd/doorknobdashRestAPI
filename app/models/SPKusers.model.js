module.exports = (sequelize, Sequelize) => {
  const Spkusers = sequelize.define("spkusers", {
    UserName: {
      type: Sequelize.STRING
    },
    Pword: {
      type: Sequelize.STRING
    },
    Userrole: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Employeenumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return Spkusers;
};
