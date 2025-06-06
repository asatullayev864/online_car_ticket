const config = require("config");
const { Sequelize } = require("sequelize");




module.exports = new Sequelize(
    config.get("db_name"),
    config.get("db_username"),
    config.get("db_password"),
    {
        host: config.get("db_host"),
        logging: false,
        dialect: "postgres",
        port: config.get("db_port"),
    }
);
