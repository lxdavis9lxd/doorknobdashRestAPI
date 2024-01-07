module.exports = (sequelize, Sequelize) => {
const DeliveryDriver = sequelize.define('deliverydriver', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
});
return DeliveryDriver
};


