const express = require("express");
const router = express.Router();
const canchasController = require("../controllers/canchacontrollers");

// Rutas del GET

router.get("/canchas", canchasController.obtenerCanchas);
router.get("/canchas/:id", canchasController.obtenerCanchasPorId);

// Rutas de Post

router.post("/canchas", canchasController.addCancha);

// Rutas de put
router.put("/canchas/:id", canchasController.updateCancha);

// Rutas del delete
router.delete("/canchas/:id", canchasController.deleteCancha);

// Ruta reservar canchas
// router.post("/:id/reservar", canchasController.reservarCancha);

// // rutas get

module.exports = router;
