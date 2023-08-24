const mongoose = require("mongoose");

// conectar a la base de datos

const connectDb = async () => {
  try {
    // "mongodb+srv://france:n7v9lvTA6CfVJvnw@messi.aoslkk9.mongodb.net/?retryWrites=true&w=majority",
    await mongoose.connect(
      "mongodb+srv://france:n7v9lvTA6CfVJvnw@messi.aoslkk9.mongodb.net/",
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
