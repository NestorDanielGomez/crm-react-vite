import {
  useNavigate,
  Form,
  useActionData,
  redirect,
  useLoaderData,
} from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { ObtenerCliente, ActualizarCliente } from "../data/clientes";

export async function loader({ params }) {
  const cliente = await ObtenerCliente(params.idCliente);
  if (Object.values(cliente).length === 0) {
    throw new Response("", { status: 404, statusText: "El cliente no Existe" });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const emailAChequear = formData.get("email");
  //validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("todos los datos son requeridos");
  }
  //validar solo email

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(emailAChequear)) {
    errores.push("El email no es valido");
  }

  //retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }
  //actualizo el cliente
  await ActualizarCliente(params.idCliente, datos);

  return redirect("/");
}

function EditarCliente() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podras modificar los datos de un cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className="shadow bg-white rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full cursor-pointer bg-blue-600 p-3 uppercase font-bold text-white text-lg hover:bg-blue-900"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
