const router = require("express").Router();

const { addDistrict, getAllDistricts, getDistrictById, updateDistrictById, deleteDistrictById } = require("../controller/district.controller");

router.post("/", addDistrict);
router.get("/", getAllDistricts);
router.get("/:id", getDistrictById);
router.put("/:id", updateDistrictById);
router.delete("/:id", deleteDistrictById);

module.exports = router;