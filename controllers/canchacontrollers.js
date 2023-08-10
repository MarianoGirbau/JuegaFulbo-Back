const CanchaModel = require("../models/canchas.models");
const Cancha = require("../models/canchas.models");

// Get

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
      cancha.nombre = req.body.nombre;
      cancha.capacidad = req.body.capacidad;
      cancha.direccion = req.body.direccion;
      cancha.lugar = req.body.lugar;
      cancha.telefono = req.body.telefono;
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

module.exports = {
  obtenerCanchas,
  obtenerCanchasPorId,
  addCancha,
  updateCancha,
  deleteCancha,
};
