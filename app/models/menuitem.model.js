module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define('menuitem', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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


