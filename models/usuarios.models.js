const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      max: 30,
      min: 3,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      max: 30,
      min: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      min: 15,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 30,
      min: 3,
      trim: true,
    },
    rol: {
      type: String,
      required: true,
      max: 30,
      min: 3,
      trim: true,
    },
  },
  { versionKey: false }
);

const UsuariosModel = mongoose.model("usuarios", usuariosSchema);

module.exports = UsuariosModel;
