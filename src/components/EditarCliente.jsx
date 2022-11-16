import { ObtenerCliente } from "../data/clientes";

export async function loader({ params }) {
  const cliente = await ObtenerCliente(params.idCliente);
  if (Object.values(cliente).length === 0) {
    throw new Response("", { status: 404, statusText: "El cliente no Existe" });
  }
  return cliente;
}

function EditarCliente() {
  return <div>EditarCliente</div>;
}

export default EditarCliente;
