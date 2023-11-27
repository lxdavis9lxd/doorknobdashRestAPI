module.exports = (sequelize, Sequelize) => {
  const Productlines = sequelize.define('productlines', {
    Productline: {
      type: Sequelize.STRING,
      allowNull: false
      
    },    
    Textdescription: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Htmldescription: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    CreatedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ModifiiedBy: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
    
  return Productlines;
};
