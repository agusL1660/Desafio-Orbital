export async function crearAtencion(atencion) {
  const respuesta = await fetch("/atencion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atencion),
  });

  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.error || "No se pudo guardar la atención");
  }

  return datos;
}
