module.exports = (sequelize, Sequelize) => {
const DeliveryDriver = sequelize.define('deliverydriver', {
 
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


