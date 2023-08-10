const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioscontroller");

router.post("/registro", usuarioController.register);
router.post("/login", usuarioController.loginUsuario);
router.get("/usuarios", usuarioController.getAllUser);

module.exports = router;
