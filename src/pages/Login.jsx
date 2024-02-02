import "../style/Login.css";

export default function Login() {

    const iniciarSesion = (event) => {
        event.preventDefault();
    }

  return (
    <div>
      <bodyt>
        <div className="wrapper">
          <form onSubmit={(event) => iniciarSesion(event)}>
            <h1>Ingresa tu cuenta</h1>
            <div className="input-box">
              <input type="text" placeholder="Usuario" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Contraseña" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Recuerdame
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                Dont't have an account? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </bodyt>
    </div>
  );
}
