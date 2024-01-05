module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define('restaurant', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        RestaurantName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        AddressId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Restaurant;
};