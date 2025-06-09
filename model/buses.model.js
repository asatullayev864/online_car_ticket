const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Buses = sequelize.define("bus", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    seat_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Buses;