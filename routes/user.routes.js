const router = require("express").Router();

const { addUser, getAllUser, getUserbyId, updateUserById, deleteUserById } = require("../controller/user.controller");

router.post("/", addUser);
router.get("/", getAllUser);
router.get("/:id", getUserbyId);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;