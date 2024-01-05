module.exports = (sequelize, Sequelize) => {
const DeliveryDriver = sequelize.define('deliverydriver', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
});
return DeliveryDriver
};


