const express = require("express");
const router = express.Router();
const quinchosController = require("../controllers/quinchoscontrollers");

// Rutas del GET

router.get("/quinchos", quinchosController.obtenerQuinchos);
router.get("/quinchos/:id", quinchosController.obtenerQuinchosPorId);

// Rutas de Post

router.post("/quinchos", quinchosController.addQuinchos);

// Rutas de put
router.put("/quinchos/:id", quinchosController.updateQuinchos);
router.put("/quinchos/reserva/:id", quinchosController.reservarQuinchos);

// Rutas del delete
router.delete("/quinchos/:id", quinchosController.deleteQuinchos);

// Ruta reservar canchas
// router.post("/:id/reservar", canchasController.reservarCancha);

// // rutas get

module.exports = router;