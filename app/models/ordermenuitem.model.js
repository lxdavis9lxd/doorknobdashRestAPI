module.exports = (sequelize, Sequelize) => {
    const OrderMenuItem = sequelize.define('ordermenuitem', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        OrderId: {
            type: Sequelize.INTEGER
        },
        MenuItemId: {
            type: Sequelize.INTEGER
        },
        QtyOrdered: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return OrderMenuItem;
};


