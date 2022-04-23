const { DataTypes, NOW } = require('sequelize');

module.exports = {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phonenumber: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    user_type_id: {
        type: DataTypes.STRING,
    },
    user_state_id: {
        type: DataTypes.STRING,
    },
    show_in_list: {
        type: DataTypes.BOOLEAN,
    },
    remember_token: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};
