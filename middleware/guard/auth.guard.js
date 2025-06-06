const { sendErrorRes } = require("../../helpers/send_error_res");
const { userJwt } = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return sendErrorRes({ message: `Header not Found.` }, res, 401);
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return sendErrorRes({ message: `Tokens not Found.` }, res, 401);
        }
        const decodedToken = await userJwt.verifyAccessToken(token)
        req.user = decodedToken
        next()
    } catch (error) {
        sendErrorRes(error, res, 403)
    }
}