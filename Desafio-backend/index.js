require("dotenv").config();

const express = require("express");
const atencionRoutes = require("./routes/atencionRoutes");

const app = express();
app.use(express.json());
app.use("/atencion", atencionRoutes);

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El JSON enviado es inválido" });
  }

  console.error(error);
  res.status(500).json({ error: "No se pudo registrar la atención" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});