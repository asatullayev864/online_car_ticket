const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Role = require("./role.model");

const UserRole = sequelize.define(
    "user_role",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
)

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = UserRole;