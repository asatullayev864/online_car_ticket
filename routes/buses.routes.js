const router = require("express").Router();
const { addBuses, getAllBuses, getBusesById, updateBusesById, deleteBusesById } = require("../controller/buses.controller");

router.post("/", addBuses);
router.get("/", getAllBuses);
router.get("/:id", getBusesById);
router.put("/:id", updateBusesById);
router.delete("/:id", deleteBusesById);

module.exports = router;