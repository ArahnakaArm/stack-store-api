const { DataTypes, NOW } = require('sequelize');

module.exports = {
    contact_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    contact_code: {
        type: DataTypes.STRING,
    },
    contact_type: {
        type: DataTypes.STRING,
    },
};
