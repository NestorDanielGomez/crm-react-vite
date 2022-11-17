import { json } from "react-router-dom";

export async function ObtenerClientes() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL);
  const resultado = await respuesta.json();
  return resultado;
}

export async function AgregarCliente(datos) {
try {
  const respuesta = await fetch(import.meta.env.VITE_API_URL, {method:"POST",
  body: JSON.stringify(datos),
  headers:{
    "Content-Type":"application/json"
  } });
  await respuesta.json()
  
} catch (error) {
  
}
}

export async function ObtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const resultado = await respuesta.json();
  return resultado;
}

export async function ActualizarCliente(id, datos) {
try {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {method:"PUT",
  body: JSON.stringify(datos),
  headers:{
    "Content-Type":"application/json"
  } });
  await respuesta.json()

} catch (error) {
  
}
}