const CanchaModel = require("../models/canchas.models");
const Cancha = require("../models/canchas.models");

// Obtener canchas

const obtenerQuinchos = async (req, res) => {
  try {
    const quinchos = await Cancha.find();
    res.json(quinchos);
  } catch (error) {
    res.status(400).json("Quinchos no encontrados");
  }
};

const obtenerQuinchosPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const quincho = await   QuinchoModel.findById(id);
    if (quincho) {
      res.json(quincho);
    } else {
      res.status(404).json("Quincho no encontrado");
    }
  } catch (error) {
    res.status(400).json("Quincho no encontrad");
    res.status(500).json("Error en el servidor");
  }
};

// creacion de una cancha

const addQuinchos = async (req, res) => {
  try {
    const quincho = new QuinchoModel(req.body);
    await quincho.save();
    res.status(201).json(quincho);
  } catch (error) {
    res.status(400).json("Quincho no quincho");
  }
};

// Actualizar una cancha

const updateQuinchos = async (req, res) => {
  try {
    const id = req.params.id;
    const quincho = await CanchaModel.findById(id);
    if (quincho) {
      quincho.numero = req.body.numero;
      quincho.capacidad = req.body.capacidad;
      quincho.precio = req.body.precio;
      quincho.img = req.body.img;
      const quinchoActualizada = await quincho.save();
      res.status(200).json("Cancha actualizada");
      res.status(quinchoActualizada);
    } else {
      res.status(400).json("Quincho no encontrado ");
    }
  } catch (error) {
    res.status(404).json("Quincho no encontrado");
  }
};

// Borrar una cancha

const deleteQuinchos = async (req, res) => {
  try {
    const id = req.params.id;
    const quincho = await QuinchoModel.findById(id);
    if (quincho) {
      await QuinchoModel.deleteOne({ _id: id });
      res.status(200).json("Quincho eliminado");
    } else {
      res.status(404).json("Quincho no encontrado");
    }
  } catch (error) {
    res.status(400).json("Quincho no eliminada");
  }
};

// Reservar una cancha 

const reservarQuinchos = async (req, res) => {
  try {
    const idQuincho = req.params.id; //viene por url
    const { idUsuario, dia, horario } = req.body;
    const quionchoReserva = await QuinchoModel.findById(idQuincho);
    if (quionchoReserva) {
      quionchoReserva.reservas[dia][horario] = idUsuario;
      const reserva = await quionchoReserva.save();
      res.status(200).json("Reserva Realizada");
      res.status(reserva);
    }else{
      res.status(404).json("Quincho no encontrado");
    }
  } catch (error) {
    res.status(400).json("Quincho no eliminado");
  }
}





module.exports = {
  obtenerQuinchos,
  obtenerQuinchosPorId,
  addQuinchos,
  updateQuinchos,
  deleteQuinchos,
  reservarQuinchos
};
