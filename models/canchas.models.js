const mongoose = require("mongoose");
const { Schema } = mongoose;

const canchasSchema = new Schema(
  {
    numero: Number, // {type: String, requerid: true}
    capacidad: Number,
    precio: Number,
    img: String, //imagen de la cancha
    reservas:
    [
        [null,null,null,null,null], // 19:00, 20:00, 21:00, 22:00, 23:00
        [null,null,null,null,null], 
        [null,null,null,null,null], 
        [null,null,null,null,null], 
        [null,null,null,null,null], 
        [null,null,null,null,null], 
        [null,null,null,null,null]
    ]
  },
  { versionKey: false }
);

const CanchaModel = mongoose.model("canchas", canchasSchema);

module.exports = CanchaModel;
