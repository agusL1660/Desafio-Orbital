const { insertarAtencion } = require("../models/atencionModel");
const TipoCliente = require("../constants/tipoCliente");

function calcularPrioridad(calificacionCliente, esUrgente, tipoCliente) {
  if (calificacionCliente < 1 || calificacionCliente > 5) {
    throw new RangeError("Calificación fuera de rango (1-5)");
  }

  const tipo = tipoCliente?.toUpperCase();
  let factor = 1.0;

  if (tipo === TipoCliente.VIP) {
    factor = 1.5;
  } 
  // Agrego regla de negocio faltante
  else if (tipo === TipoCliente.CORPORATIVO && calificacionCliente >= 3) {
    factor = 1.2;
  }

  let prioridad = calificacionCliente * factor;
  if (esUrgente) {
    prioridad += 2.0;
  }

  return Math.min(prioridad, 10.0);
}

async function registrarAtencion({ calificacionCliente, esUrgente, tipoCliente }) {
  // Calculo prioridad con codigo legacy
  const prioridad = calcularPrioridad(calificacionCliente, esUrgente, tipoCliente);
  // Inserto la atencion
  const id = await insertarAtencion({ calificacionCliente, esUrgente, tipoCliente: tipoCliente.toUpperCase(), prioridad });

  // retorno objeto creado
  return { id, prioridad };
}

module.exports = { calcularPrioridad, registrarAtencion };
