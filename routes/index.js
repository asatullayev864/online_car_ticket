const router = require("express").Router();

const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const user_roleRouter = require("./userRole.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/user-role", user_roleRouter);

module.exports = router;