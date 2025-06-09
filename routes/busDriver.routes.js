const { addBusDriver, getAllBusDrivers, getBusDriverById, updateBusDriverById, deleteBusDriverById } = require("../controller/busDriver.controller");
const { route } = require("./auth.routes");

const router = require("express").Router();

router.post("/", addBusDriver);
router.get("/", getAllBusDrivers);
router.get("/:id", getBusDriverById);
router.put("/:id", updateBusDriverById);
router.delete("/:id", deleteBusDriverById);

module.exports = router;