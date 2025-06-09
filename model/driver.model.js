const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Driver = sequelize.define("driver", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Driver;