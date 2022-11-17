import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { AgregarCliente } from "../data/clientes";

export async function action({ request }) {
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

  await AgregarCliente(datos);

  return redirect("/");
}

const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Completa todos los campos para generar un nuevo Cliente
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
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full cursor-pointer bg-blue-600 p-3 uppercase font-bold text-white text-lg hover:bg-blue-900"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;

/*
useNavigate: SON PARA REDIRECCIONAR hacia pagina hacia otra. ideal dentro de los botones, no se le aplican clases css
(-1) es para que vuelva a la pagina anterior a la que se encontraba
Link: Son enlaces,cumple la misma funcion pero se le pueden poner clases.. ideal para botones.
redirect: ideal para trabajar con loaders y actions
*/
