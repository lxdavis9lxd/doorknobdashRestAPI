module.exports = (sequelize, Sequelize) => {
const Address = sequelize.define('address', {
 
    UnitNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    StreetNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    AddressLine1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    AddressLine2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    City: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Region: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PostalCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    CountryId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Address',
    timestamps: false
});
return Address;
};


