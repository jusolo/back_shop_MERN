const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uri =
  "mongodb+srv://test:12345@cluster0.wteemk6.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Conexión establecida con MongoDB");
});

// Rutas
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
