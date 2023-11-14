const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secreto =
  "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7";

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secreto,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login exitoso", username: user.username, token });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al autenticar usuario", error: error.message });
  }
};
