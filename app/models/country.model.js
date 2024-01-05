const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Country = sequelize.define('country', {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CountryName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Country;
};
