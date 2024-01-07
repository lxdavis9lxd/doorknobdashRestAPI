module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define('orderstatus', {
    
        StatusValue: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return OrderStatus;
};