const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Buses = require("./buses.model");
const Driver = require("./driver.model");

const busDriver = sequelize.define(
    "busDrive",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }
);

Buses.belongsToMany(Driver, { through: busDriver });
Driver.belongsToMany(Buses, { through: busDriver });

module.exports = busDriver