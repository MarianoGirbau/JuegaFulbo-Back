const mongoose = require("mongoose");
const { Schema } = mongoose;

const canchasSchema = new Schema(
  {
    nombre: String, // {type: String, requerid: true}
    capacidad: Number,
    direccion: String,
    lugar: String,
    telefono: Number,
  },
  { versionKey: false }
);

const CanchaModel = mongoose.model("canchas", canchasSchema);

module.exports = CanchaModel;
