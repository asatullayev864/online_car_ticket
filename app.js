const express = require("express");
const config = require("config");
const PORT = config.get("port") || 3333;
const cookieParser = require("cookie-parser");

const sequelize = require("./config/db")

const indexRoute = require("./routes/index");

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use("/api", indexRoute);

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Server running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
