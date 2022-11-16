import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { ObtenerClientes } from "../data/clientes";
export const loader = () => {
  const clientes = ObtenerClientes();
  //un loader siempre tiene que retornar algo.. pongo un {}vacio para que quite los errores en pantalla
  return clientes;
};

const Index = () => {
  const datos = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administrador de Clientes</p>
      {datos.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay datos</p>
      )}
    </>
  );
};

export default Index;
