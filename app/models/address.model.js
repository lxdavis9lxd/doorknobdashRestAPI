module.exports = (sequelize, Sequelize) => {
const Address = sequelize.define('address', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    UnitNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    StreetNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    AddressLine1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AddressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    City: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Region: {
        type: DataTypes.STRING,
        allowNull: true
    },
    PostalCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CountryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Address',
    timestamps: false
});
return Address;
};


