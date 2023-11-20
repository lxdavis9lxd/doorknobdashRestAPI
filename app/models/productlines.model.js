module.exports = (sequelize, Sequelize) => {
  const Productlines = sequelize.define('productlines', {
    Productline: {
      type: Sequelize.STRING
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
  }, {
    // Add the following code to set the schema options
    schema: 'public',
    timestamps: false
  });

  return Productlines;
};
