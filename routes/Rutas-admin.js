const express = require("express");
const { route } = require("./Rutas-canchas");
const router = express.Router();

router.get("/administracion", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "Ruta Protegida",
      user: req.user,
    },
  });
});

module.exports = router;
