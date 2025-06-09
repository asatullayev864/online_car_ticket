const router = require("express").Router();

const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const user_roleRouter = require("./userRole.routes");
const busesRouter = require("./buses.routes");
const driverRouter = require("./driver.routes");
const busdriverRouter = require("./busDriver.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/user-role", user_roleRouter);
router.use("/buses", busesRouter);
router.use("/driver", driverRouter);
router.use("/bus-driver", busdriverRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);

module.exports = router;