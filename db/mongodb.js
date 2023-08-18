const mongoose = require("mongoose");

// conectar a la base de datos

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb://0.0.0.0:27017/juegafulbo",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar", error);
  }
};

module.exports = connectDb;
