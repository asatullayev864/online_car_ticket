const router = require("express").Router();

const { addRole, getAllRoles, getRoleById, updateRoleById, deleteRoleById } = require("../controller/role.controller");

router.post("/", addRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRoleById);
router.delete("/:id", deleteRoleById);

module.exports = router;