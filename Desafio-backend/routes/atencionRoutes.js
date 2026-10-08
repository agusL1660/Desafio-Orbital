const express = require("express");
const { registrarAtencion } = require("../services/atencionService");

const TipoCliente = require("../constants/tipoCliente");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { esUrgente, tipoCliente,calificacionCliente } = req.body ?? {};

  if (!Number.isInteger(calificacionCliente) ){
    return res.status(400).json({ error: "calificacionCliente debe ser un entero" });
  }
  if (typeof esUrgente !== "boolean") {
    return res.status(400).json({ error: "esUrgente debe ser un booleano" });
  }
  if (typeof tipoCliente !== "string" || !Object.values(TipoCliente).includes(tipoCliente.toUpperCase())) {
    return res.status(400).json({ error: "tipoCliente debe ser VIP o CORPORATIVO" });
  }

  try {
    const atencion = await registrarAtencion(req.body ?? {});
    res.status(201).json(atencion);
  } catch (error) {
    if (error instanceof RangeError) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;
