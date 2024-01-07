module.exports = (sequelize, Sequelize) => {
const CustomerAddress = sequelize.define('customeraddress', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
