const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Country = sequelize.define('country', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        CountryName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Country;
};
