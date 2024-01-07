module.exports = (sequelize, Sequelize) => {
    const restaurants = sequelize.define('restaurants', {
      
        RestaurantName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        AddressId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return restaurants;
};