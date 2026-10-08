const pool = require("../config/database");

async function insertarAtencion({ calificacionCliente, esUrgente, tipoCliente, prioridad }) {
  const sql = "INSERT INTO atenciones_orbital (calificacion_cliente, es_urgente, tipo_cliente, prioridad) VALUES (?, ?, ?, ?)";
  const valores = [calificacionCliente, esUrgente, tipoCliente, prioridad];
  const [resultado] = await pool.execute(sql, valores);
  return resultado.insertId;
}

module.exports = { insertarAtencion };
