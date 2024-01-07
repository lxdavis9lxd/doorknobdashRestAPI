module.exports = (sequelize, Sequelize) => {
const CustomerAddress = sequelize.define('customeraddress', {
  
    CustomerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    AddressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

return CustomerAddress
};
