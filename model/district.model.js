const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Region = require("./regions.model");

const District = sequelize.define("District", {
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

Region.hasMany(District, {foreignKey: "regionId"})
District.belongsTo(Region, { foreignKey: "regionId" });

module.exports = District;