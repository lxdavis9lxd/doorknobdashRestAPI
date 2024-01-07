module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define('menuitem', {
      
        RestaurantId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ItemName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Price: {
            type: Sequelize.FLOAT,
            allowNull: true
        }
    });

    return MenuItem;
};


