module.exports = (sequelize, Sequelize) => {
const CustomerAddress = sequelize.define('customeraddress', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    AddressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

return CustomerAddress
};
