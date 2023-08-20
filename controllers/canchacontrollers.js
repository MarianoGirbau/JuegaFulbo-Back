const CanchaModel = require("../models/canchas.models");
const Cancha = require("../models/canchas.models");

// Obtener canchas

const obtenerCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.find();
    res.json(canchas);
  } catch (error) {
    res.status(400).json("Canchas no encontradas");
  }
};

const obtenerCanchasPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const cancha = await CanchaModel.findById(id);
    if (cancha) {
      res.json(cancha);
    } else {
      res.status(404).json("Cancha no encontrada");
    }
  } catch (error) {
    res.status(400).json("Cancha no encontrada");
    res.status(500).json("Error en el servidor");
  }
};

// creacion de una cancha

const addCancha = async (req, res) => {
  try {
    const cancha = new CanchaModel(req.body);
    await cancha.save();
    res.status(201).json(cancha);
  } catch (error) {
    res.status(400).json("Cancha no creada");
  }
};

// Actualizar una cancha

const updateCancha = async (req, res) => {
  try {
    const id = req.params.id;
    const cancha = await CanchaModel.findById(id);
    if (cancha) {
      cancha.numero = req.body.numero;
      cancha.capacidad = req.body.capacidad;
      cancha.precio = req.body.precio;
      cancha.img = req.body.img;
      const canchaActualizada = await cancha.save();
      res.status(200).json("Cancha actualizada");
      res.status(canchaActualizada);
    } else {
      res.status(400).json("Cancha no encontrada ");
    }
  } catch (error) {
    res.status(404).json("cancha no encontrada");
  }
};

// Borrar una cancha

const deleteCancha = async (req, res) => {
  try {
    const id = req.params.id;
    const cancha = await CanchaModel.findById(id);
    if (cancha) {
      await CanchaModel.deleteOne({ _id: id });
      res.status(200).json("Cancha eliminada");
    } else {
      res.status(404).json("Cancha no encontrada");
    }
  } catch (error) {
    res.status(400).json("Cancha no eliminada");
  }
};

// Reservar una cancha 

const reservarCancha = async (req, res) => {
  try {
    const idCancha = req.params.id;
    const { idUsuario, dia, horario } = req.body;
    const canchaReserva = await CanchaModel.findById(idCancha);
    if (canchaReserva) {
      canchaReserva.reservas[dia][horario] = idUsuario;
      const reserva = await canchaReserva.save();
      res.status(200).json("Reserva Realizada");
      res.status(reserva);
    }else{
      res.status(404).json("Cancha no encontrada");
    }
  } catch (error) {
    res.status(400).json("Cancha no eliminada");
  }
}

// const reservarCancha = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { usuario } = req.body;
    
//     const cancha = await CanchaModel.findById(id);

//     if (cancha) {
//       cancha.reserva = {
//         usuario,
//         fecha: new Date()
//       };

//       await cancha.save();
//       res.status(200).json("Cancha reservada");
//     } else {
//       res.status(404).json("Cancha no encontrada");
//     }
//   } catch (error) {
//     res.status(400).json("No se pudo realizar la reserva");
//   }
// };



module.exports = {
  obtenerCanchas,
  obtenerCanchasPorId,
  addCancha,
  updateCancha,
  deleteCancha,
  reservarCancha
};
