const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password") || user.isNew) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
