import { Navigate } from "react-router-dom";
import "../style/Login.css";
import { ApiWebURL } from "../utils";

export default function Login() {
  // Usa Navigate como componente JSX, no como función
  const NavigateComponent = <Navigate to="/proveedores" replace={true} />;

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
        alert("El usuario no está registrado");
        break;
      case -2:
        alert("La contraseña es incorrecta");
        break;
      default:
        alert("¡Bienvenido!");
        // Utiliza NavigateComponent como un componente JSX
        {NavigateComponent}
        break;
    }
  };

  return (
    <div>
      <body className="d-flex w-100">
        <div className="wrapper bg-danger items-center">
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
              Login
            </button>
            <div className="register-link">
              <p>
                ¿No tienes una cuenta? <a href="#">Regístrate</a>
              </p>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
}
