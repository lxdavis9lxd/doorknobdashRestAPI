const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Country = sequelize.define('country', {
    
        CountryName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Country;
};
