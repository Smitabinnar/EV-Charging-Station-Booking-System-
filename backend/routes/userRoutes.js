const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// =======================
// GET All Users
// =======================
router.get("/", userController.getUsers);

// =======================
// GET User By ID
// =======================
router.get("/:id", userController.getUserById);

// =======================
// CREATE User
// =======================
router.post("/", userController.createUser);

// =======================
// LOGIN User
// =======================
router.post("/login", userController.loginUser);

// =======================
// UPDATE User
// =======================
router.put("/:id", userController.updateUser);

// =======================
// DELETE User
// =======================
router.delete("/:id", userController.deleteUser);

module.exports = router;