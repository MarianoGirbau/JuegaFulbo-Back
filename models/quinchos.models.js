const mongoose = require("mongoose");
const { Schema } = mongoose;

const quinchoSchema = new Schema(
  {
    numero: Number, // {type: String, requerid: true}
    capacidad: Number,
    precio: Number,
    img: String, //imagen de la cancha
    reservas:
    [
        [null,null,null,null,null], //Domingo: 19:00, 20:00, 21:00, 22:00, 23:00
        [null,null,null,null,null], //Lunes
        [null,null,null,null,null], //Martes
        [null,null,null,null,null], //Miercoles
        [null,null,null,null,null], //Jueves
        [null,null,null,null,null], //Viernes
        [null,null,null,null,null] //Sabado
    ]
  },
  { versionKey: false }
);

const CanchaModel = mongoose.model("quinchos", quinchosSchema);

module.exports = CanchaModel;
