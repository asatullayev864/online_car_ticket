const router = require("express").Router();

const { addRegion, getAllRegions, updateRegionById, deleteRegionById, getRegionById } = require("../controller/regions.controller");

router.post("/", addRegion);
router.get("/", getAllRegions);
router.get("/:id", getRegionById);
router.put("/:id", updateRegionById);
router.delete("/:id", deleteRegionById);

module.exports = router;