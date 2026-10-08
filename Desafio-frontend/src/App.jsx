import { useState } from "react";
import { crearAtencion } from "./services/atencionApi";
import "./App.css";

export default function App() {
  const [calificacion, setCalificacion] = useState("3");
  const [tipoCliente, setTipoCliente] = useState("VIP");
  const [esUrgente, setEsUrgente] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  async function guardarAtencion(event) {
    event.preventDefault();
    setError("");
    setResultado(null);

    try {
      const atencion = await crearAtencion({
        calificacionCliente: Number(calificacion),
        tipoCliente,
        esUrgente,
      });
      setResultado(atencion);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="pagina">
      <div className="encabezado">
        <span className="marca">ORBITAL / ATENCIÓN</span>
        <h1>Nueva atención</h1>
        <p>Cargá los datos y guardá la prioridad calculada.</p>
      </div>

      <form className="formulario" onSubmit={guardarAtencion}>
        <label htmlFor="tipo">Tipo de cliente</label>
        <select
          id="tipo"
          value={tipoCliente}
          onChange={(e) => setTipoCliente(e.target.value)}
        >
          <option value="CORPORATIVO">Corporativo</option>
          <option value="VIP">VIP</option>
        </select>

        <label htmlFor="calificacion">Calificación</label>
        <select
          id="calificacion"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((numero) => (
            <option key={numero} value={numero}>
              {numero}
            </option>
          ))}
        </select>

        <label htmlFor="urgente">¿Es urgente?</label>
        <select
          id="urgente"
          value={String(esUrgente)}
          onChange={(e) => setEsUrgente(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>

        <button type="submit">Guardar atención</button>
      </form>

      {resultado && (
        <div className="mensaje exito" role="status">
          Atención #{resultado.id} guardada. Prioridad:{" "}
          <strong>{resultado.prioridad}</strong>
        </div>
      )}

      {error && (
        <div className="mensaje error" role="alert">
          {error}
        </div>
      )}
    </main>
  );
}