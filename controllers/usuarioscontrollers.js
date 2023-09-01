const Usuarios = require("../models/usuarios.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuariosModel = require("../models/usuarios.models");

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await Usuarios.findOne({ email });
    if (existingUser) {
      return res.status(409).json("Ya existe un usuario registrado con este correo electrónico.");
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = new Usuarios({
      nombre,
      apellido,
      email,
      password: hash,
      rol,
    });
    await usuario.save();
    res.status(201).json("Usuario creado");
  } catch (error) {
    res.status(400).json("Usuario no creado");
  }
};

const loginUsuario = async (req, res) => {

  const user = await Usuarios.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Usuario y/o Password incorrecto" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res.status(400).json({ message: "Usuario y/o Password incorrecto" });
  }

  // generar el token

  const token = jwt.sign(
    {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

const getAllUser = async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json("Usuarios no encontrados");
  }
};

const deleteUsuario = async (req, res) => {
  console.log("funcion deleteUsuario");
  try {
    const id = req.params.id;
    const usuario = await UsuariosModel.findById(id);
    // console.log("back", cancha, id);
    if (usuario) {
      await UsuariosModel.deleteOne({ _id: id });
      res.status(200).json("Usuario eliminada");
    } else {
      res.status(404).json("Usuario no encontrada");
    }
  } catch (error) {
    res.status(400).json("Usuario no eliminada");
  }
};

const updateUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await UsuariosModel.findById(id);

    if (!usuario) {
      return res.status(400).json("Usuario no encontrado");
    }

    const { nombre, apellido, email, rol } = req.body;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.rol = rol;

    try {
      const usuarioActualizado = await usuario.save();
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el usuario",
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: "Usuario no encontrado",
    });
  }
};

module.exports = {
  register,
  loginUsuario,
  getAllUser,
  deleteUsuario,
  updateUsuario,
};
