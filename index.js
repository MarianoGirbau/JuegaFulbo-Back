const express = require("express"); // importar express
const app = express(); // inicializar express
const connectDb = require("./db/mongodb");
// const comprabacionJwt = require("./middleware/comprobacionjwt");

app.use(express.json()); // permite recibir obj en forma de json
app.use(express.urlencoded({ extended: true })); // permite recibir parametros y queris en la rutas
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const initApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor puesto en marcha en el puerto ${PORT}`);
    });
    await connectDb();
  } catch (error) {
    console.log("Error al iniciar la aplicacion");
  }
};

initApp();

// app.use("/api", require("./routes/Rutas-canchas"));
// app.use("/api/user", require("./routes/Rutas-usuarios"));
// app.use("/protegida", comprabacionJwt, require("./routes/Rutas-admin"));

// crear una ruta em express

// app.use("/api", require("./routes/Rutas-canchas"));
// app.use("/api/user", require("./routes/Rutas-usuarios"));
// app.use("/protegida", comprabacionJwt, require("./routes/Rutas-admin"));
