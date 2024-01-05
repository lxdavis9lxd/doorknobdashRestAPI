module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define('orderstatus', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        StatusValue: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return OrderStatus;
};