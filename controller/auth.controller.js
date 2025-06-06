const { sendErrorRes } = require("../helpers/send_error_res");
const Role = require("../model/role.model");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { userJwt } = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, attributes: ["name"], through: { attributes: [] } }],
        });

        if (!user) {
            return sendErrorRes({ message: `email or password incorrect` }, res, 400);
        }
        const verified_password = await bcrypt.compare(
            password,
            user.password
        );

        if (!verified_password) {
            return sendErrorRes({ message: `email or password incorrect` }, res, 400);
        }

        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };

        const tokens = userJwt.generateTokens(payload);
        const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
        user.hashed_token = hashed_token;
        await user.save();
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("cookie_refresh_time"),
            httpOnle: true,
        });
        res
            .status(200)
            .json({ message: `User logged in`, accessToken: tokens.accessToken });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

module.exports = {
    login
}