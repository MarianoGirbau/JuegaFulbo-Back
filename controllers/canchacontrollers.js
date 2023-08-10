const Usuarios = require("../models/usuarios.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const usuario = new Usuarios({
      nombre,
      apellido,
      email,
      password: hash,
      rol,
    });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear el usuario", error });
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

module.exports = {
  register,
  loginUsuario,
  getAllUser,
};
