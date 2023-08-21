const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioscontrollers");

router.post("/registro", usuarioController.register);
router.post("/login", usuarioController.loginUsuario);
router.get("/usuarios", usuarioController.getAllUser);
router.delete("/usuarios/:id", usuarioController.deleteUsuario);
router.put("/usuarios/:id", usuarioController.updateUsuario);
module.exports = router;
