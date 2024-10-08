import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";
import { ApiWebURL } from "../utils";

export default function Login() {
  const [redirect, setRedirect] = useState(false);

  const iniciarSesion = async (event) => {
    event.preventDefault();

    const dataForm = new FormData(event.currentTarget);
    const rutaServicio = ApiWebURL + "iniciarsesion.php";

    let formData = new FormData();

    formData.append("usuario", dataForm.get("usuario"));
    formData.append("clave", dataForm.get("clave"));

    const response = await fetch(rutaServicio, {
      method: "post",
      body: formData,
    });

    const result = await response.json();

    switch (result) {
      case -1:
        mostrarNotificacion("El usuario no está registrado", "error");
        break;
      case -2:
        mostrarNotificacion("La contraseña es incorrecta", "error");
        break;
      default:
        mostrarNotificacion("¡Bienvenido!", "success");
        // Establece el estado para redirigir
        setRedirect(true);
        break;
    }
  };

  const mostrarNotificacion = (message, type) => {
    toast[type](message);
  };

  // Redirige a "/Directores" si el estado de redirect es true
  if (redirect) {
    return <Navigate to="/Directores" replace={true} />;
  }

  return (
    <div>
      <bodyt className="d-flex w-100">
        <div className="wrapper items-center">
          <form onSubmit={(event) => iniciarSesion(event)}>
            <h1>Ingresa tu cuenta</h1>
            <div className="input-box">
              <input type="text" name="usuario" placeholder="Usuario" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                id="txtClave"
                type="password"
                name="clave"
                placeholder="Contraseña"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <input
              onClick={(event) =>
                document
                  .getElementById("txtClave")
                  .setAttribute(
                    "type",
                    event.target.checked ? "text" : "password"
                  )
              }
              type="checkbox"
              className="mx-4"
            />
            <label>Mostrar contraseña</label>
            <button type="submit" className="btn">
              Ingresar
            </button>
            <div className="register-link">
              <p>
                ¿No tienes una cuenta? <a href="#">Regístrate</a>
              </p>
            </div>
          </form>
        </div>
      </bodyt>

      {/* Toastify container para las notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
