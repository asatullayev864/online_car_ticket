const router = require("express").Router();
const { addDriver, getAllDrivers, getDriverById, updateDriverById, deleteDriverById } = require("../controller/drive.controller");

router.post("/", addDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriverById);
router.delete("/:id", deleteDriverById);

module.exports = router;