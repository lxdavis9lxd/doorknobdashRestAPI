module.exports = (sequelize, Sequelize) => {
    const FoodOrder = sequelize.define('foodorder', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        autoIncrement: true,
        },
        CustomerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        RestaurantId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        CustomerAddressId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OrderStatusId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        AssignedDriverId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        OrderDatetime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        DeliveryFee: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        TotalAmount: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        RequestedDeliveryDatetime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        CustDriverRating: {
            type: Sequelize.STRING,
            allowNull: true
        },
        CustRestaurantRating: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return FoodOrder;
};


