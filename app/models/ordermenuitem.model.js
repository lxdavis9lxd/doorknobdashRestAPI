module.exports = (sequelize, Sequelize) => {
    const OrderMenuItem = sequelize.define('ordermenuitem', {
      
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


