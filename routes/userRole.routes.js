const { addUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById } = require("../controller/userRole.controller");

const router = require("express").Router();


router.post("/", addUserRole);
router.get("/", getAllUserRoles);
router.get("/:id", getUserRoleById);
router.put("/:id", updateUserRoleById);
router.delete("/:id", deleteUserRoleById);

module.exports = router;