const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Region = sequelize.define("Region", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Region;